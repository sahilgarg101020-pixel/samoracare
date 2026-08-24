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
  return {
    name,
    rows,
    getLastRow: () => rows.length,
    appendRow: (r) => rows.push(r),
    setFrozenRows: () => {},
    getRange: (row, col, numRows, numCols) => ({
      setFontWeight: () => {},
      getValues: () => rows.slice(row - 1, row - 1 + numRows).map(r => r.slice(col - 1, col - 1 + numCols)),
    }),
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
globalThis.Logger = { log: () => {} };

props.set('SPREADSHEET_ID', 'fake-sheet-id');   // standalone path

// ---- Load the real script --------------------------------------------------
const src = readFileSync('apps-script/Code.gs', 'utf8');
new Function(src + '\nglobalThis.doPost = doPost; globalThis.SHEETS = SHEETS;')();

const post = (payload) =>
  JSON.parse(globalThis.doPost({ postData: { contents: JSON.stringify(payload) } }).getContent());

// ---- Screener lead ---------------------------------------------------------
const screener = {
  type: 'get_started', lead_id: 'id-screener-1',
  fullName: 'Ada Screener', email: 'ada@example.com', phone: '555 111 2222', countryCode: '+1',
  first_time_applying: 'denied', conditions: 'back injury and depression',
  seeing_doctors: 'regularly', last_able_to_work: 'over_1yr', job_title: 'warehouse worker',
  sms_consent: 'yes',
};
// ---- Register lead ---------------------------------------------------------
const register = {
  type: 'register', lead_id: 'id-register-1',
  fullName: 'Bo Register', email: 'bo@example.com', phone: '555 333 4444', countryCode: '+1',
  inquiring_for: 'family_or_friend', state: 'Washington', date_of_birth: '04/09/1971',
  receiving_benefits: 'no', owes_overpayment: 'no', health_conditions: 'yes',
  sms_consent: 'no',
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

console.log('\n=== emails sent ===', emails.length);
emails.forEach(e => {
  console.log('\n  to:', e.to, '| replyTo:', e.replyTo);
  console.log('  subject:', e.subject);
  console.log('  body:\n' + e.body.split('\n').map(l => '    ' + l).join('\n'));
});
