/**
 * Runs Code.gs under Node with the Apps Script globals stubbed, so both form
 * shapes can be checked without deploying or touching a real sheet or inbox.
 *
 *   node apps-script/test-local.mjs
 *
 * Covers: routing per form, tab creation and column order, duplicate
 * suppression on retry, rejection of an unknown type, and the email bodies.
 */
import { readFileSync } from 'node:fs';

// ---- Minimal stubs for the Apps Script runtime -----------------------------
const sheets = new Map();
function makeSheet(name) {
  const rows = [];
  // Range setters return the range in Apps Script, so the stub has to as well
  // or any chained call in Code.gs throws here but works in production.
  const makeRange = (row, col, numRows, numCols) => {
    const range = {
      setFontWeight: () => range,
      setValues: (values) => {
        values.forEach((line, i) => {
          const target = (rows[row - 1 + i] ||= []);
          line.forEach((value, j) => {
            target[col - 1 + j] = value;
          });
        });
        return range;
      },
      getValues: () =>
        rows.slice(row - 1, row - 1 + numRows).map((r) => (r || []).slice(col - 1, col - 1 + numCols)),
    };
    return range;
  };
  return {
    name,
    rows,
    getLastRow: () => rows.length,
    getLastColumn: () => rows.reduce((widest, r) => Math.max(widest, r.length), 0),
    appendRow: (r) => rows.push(r),
    setFrozenRows: () => {},
    getRange: makeRange,
  };
}
const book = {
  getSheetByName: (n) => sheets.get(n) || null,
  insertSheet: (n) => { const s = makeSheet(n); sheets.set(n, s); return s; },
};
const props = new Map();
const emails = [];

globalThis.SpreadsheetApp = { getActiveSpreadsheet: () => null, openById: () => book };
globalThis.PropertiesService = { getScriptProperties: () => ({ getProperty: (k) => props.get(k) ?? null }) };
globalThis.MailApp = { sendEmail: (o) => emails.push(o) };
globalThis.ContentService = {
  MimeType: { JSON: 'json' },
  createTextOutput: (t) => ({ setMimeType: () => ({ getContent: () => t }) }),
};
globalThis.Logger = { log: (m) => console.error('  [Logger]', m) };

props.set('SPREADSHEET_ID', 'fake-sheet-id');   // standalone path

// ---- Load the real script --------------------------------------------------
const src = readFileSync('apps-script/Code.gs', 'utf8');
new Function(src + '\nglobalThis.doPost = doPost; globalThis.SHEETS = SHEETS;')();

const post = (payload) =>
  JSON.parse(globalThis.doPost({ postData: { contents: JSON.stringify(payload) } }).getContent());

/*
 * Seeds the screener tab as it exists in production: the header from before
 * has_attorney, plus a row written under it. Without this the suite only ever
 * saw freshly created tabs, which is why an inserted-rather-than-appended
 * column went unnoticed.
 */
const LEGACY_HEADER = [
  'received_at', 'lead_id', 'fullName', 'email', 'countryCode', 'phone',
  'first_time_applying', 'conditions', 'seeing_doctors',
  'last_able_to_work', 'job_title', 'sms_consent',
];
const legacy = book.insertSheet('Screener leads');
legacy.appendRow(LEGACY_HEADER);
legacy.appendRow([new Date(), 'legacy-1', 'Old Row', 'old@example.com', '+1', '555 000 0000',
  'first_time', 'old conditions', 'regularly', 'over_1yr', 'cook', 'yes']);

// ---- Screener lead ---------------------------------------------------------
const screener = {
  type: 'get_started', lead_id: 'id-screener-1',
  fullName: 'Ada Screener', email: 'ada@example.com', phone: '555 111 2222', countryCode: '+1',
  first_time_applying: 'denied', conditions: 'back injury and depression',
  seeing_doctors: 'regularly', last_able_to_work: 'over_1yr', job_title: 'warehouse worker',
  has_attorney: 'no', sms_consent: 'yes',
};
// ---- Register lead ---------------------------------------------------------
const register = {
  type: 'register', lead_id: 'id-register-1',
  fullName: 'Bo Register', email: 'bo@example.com', phone: '555 333 4444', countryCode: '+1',
  inquiring_for: 'family_or_friend', state: 'Washington', date_of_birth: '04/09/1971',
  receiving_benefits: 'no', owes_overpayment: 'no', health_conditions: 'yes',
  has_attorney: 'yes', sms_consent: 'no',
};

console.log('screener ->', post(screener));
console.log('register ->', post(register));
console.log('retry of screener (should dedupe) ->', post(screener));
console.log('unknown type ->', post({ type: 'nonsense', lead_id: 'x' }));

console.log('\n=== tabs created ===');
for (const [name, s] of sheets) {
  console.log(`\n[${name}]  ${s.rows.length - 1} data row(s)`);
  console.log('  header:', s.rows[0].join(' | '));
  s.rows.slice(1).forEach(r =>
    console.log('  row   :', r.map(v => (v instanceof Date ? 'DATE' : String(v))).join(' | ')));
}

// ---- Representation flag --------------------------------------------------
// Whether someone is already represented decides whether they can be called at
// all, so each answer is checked rather than eyeballed.
console.log('unsure ->', post({ ...screener, lead_id: 'id-unsure', fullName: 'Cy Unsure', has_attorney: 'not_sure' }));

const bySubject = (needle) => emails.filter((e) => e.subject.includes(needle));
const checks = [
  ['represented lead is flagged DO NOT CALL', bySubject('DO NOT CALL').length === 1],
  ['unsure lead is flagged CHECK FIRST', bySubject('CHECK FIRST').length === 1],
  [
    'unrepresented lead carries no flag',
    emails.some((e) => e.subject === 'New lead: Ada Screener (screener)'),
  ],
  [
    'the warning is in the body, not only the subject',
    bySubject('DO NOT CALL')[0].body.startsWith('*** They say a lawyer'),
  ],
  [
    'an unanswered lead is flagged CHECK FIRST',
    (() => {
      const before = emails.length;
      post({ ...screener, lead_id: 'id-blank', fullName: 'Dee Blank', has_attorney: undefined });
      return emails[before] && emails[before].subject.startsWith('CHECK FIRST');
    })(),
  ],
  [
    'legacy header is corrected, not duplicated',
    (() => {
      const header = sheets.get('Screener leads').rows[0];
      return (
        header.join(',') === globalThis.SHEETS.get_started.columns.join(',') &&
        header.filter((h) => h === 'sms_consent').length === 1
      );
    })(),
  ],
  [
    'sms_consent stays in the column legacy rows used',
    (() => {
      const rows = sheets.get('Screener leads').rows;
      const col = LEGACY_HEADER.indexOf('sms_consent');
      const ada = rows.find((r) => r[2] === 'Ada Screener');
      return rows[1][col] === 'yes' && ada[col] === 'yes';
    })(),
  ],
  [
    'has_attorney reaches both sheets',
    ['Screener leads', 'Register leads'].every((tab) =>
      sheets.get(tab).rows[0].includes('has_attorney'),
    ),
  ],
];

console.log('\n=== representation checks ===');
let failed = 0;
for (const [name, ok] of checks) {
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}`);
  if (!ok) failed++;
}

console.log('\n=== emails sent ===', emails.length);
emails.forEach(e => {
  console.log('\n  to:', e.to, '| replyTo:', e.replyTo);
  console.log('  subject:', e.subject);
  console.log('  body:\n' + e.body.split('\n').map(l => '    ' + l).join('\n'));
});

if (failed > 0) {
  console.error(`\n${failed} check(s) failed`);
  process.exit(1);
}
