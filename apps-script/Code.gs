/**
 * SamoraCare lead intake.
 *
 * Receives leads from the Cloudflare Pages Function at samoracare.com/api/lead,
 * writes them to a sheet, and emails the team. This replaces the n8n step, so
 * everything after the website happens here.
 *
 * Two forms post here and they carry different questions, so each gets its own
 * tab with its own columns rather than one sheet full of blanks.
 *
 *   type: 'get_started'  ->  the multi-step screener at /get-started
 *   type: 'register'     ->  the one-page form at /register
 *
 * Deploy: Deploy > New deployment > Web app,
 *   Execute as:        Me
 *   Who has access:    Anyone
 * "Anyone" is required because Cloudflare calls this without a Google identity.
 * Set SHARED_TOKEN (below) so that being public is not the same as being open.
 */

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

/** Where team notifications go. Comma-separate for several recipients. */
var NOTIFY_EMAIL = 'team@samoracare.com';

/** Shown as the sender name on notifications. */
var SENDER_NAME = 'SamoraCare website';

/**
 * Send the person who filled the form an acknowledgement.
 *
 * Left off deliberately: turning it on starts emailing real claimants, which is
 * a decision to make on purpose rather than inherit from a default. Set to true
 * once the wording below has been read and approved.
 */
var SEND_ACKNOWLEDGEMENT = false;

/**
 * Optional shared secret. Set a Script Property named SHARED_TOKEN
 * (Project Settings > Script properties) and send the same value from the
 * Worker, and anything without it is rejected. Until it is set, requests are
 * accepted without one so nothing breaks mid-migration.
 */
function getSharedToken_() {
  return PropertiesService.getScriptProperties().getProperty('SHARED_TOKEN');
}

/** Column order per form. Add to the end; never reorder an existing tab. */
var SHEETS = {
  get_started: {
    tab: 'Screener leads',
    columns: [
      'received_at', 'lead_id', 'fullName', 'email', 'countryCode', 'phone',
      'first_time_applying', 'conditions', 'seeing_doctors',
      'last_able_to_work', 'job_title', 'sms_consent',
    ],
  },
  register: {
    tab: 'Register leads',
    columns: [
      'received_at', 'lead_id', 'fullName', 'email', 'countryCode', 'phone',
      'inquiring_for', 'state', 'date_of_birth', 'receiving_benefits',
      'owes_overpayment', 'health_conditions', 'sms_consent',
    ],
  },
};

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'empty_body' });
    }

    var body = JSON.parse(e.postData.contents);

    var expected = getSharedToken_();
    if (expected && body.token !== expected) {
      // Do not say which part was wrong.
      return json_({ ok: false, error: 'unauthorised' });
    }

    var config = SHEETS[body.type];
    if (!config) {
      return json_({ ok: false, error: 'unknown_type' });
    }

    var sheet = getSheet_(config);

    // The Worker retries up to three times. If a previous attempt wrote the row
    // but the response was lost, this stops a duplicate row and a second email.
    if (body.lead_id && alreadySeen_(sheet, body.lead_id)) {
      return json_({ ok: true, duplicate: true });
    }

    appendRow_(sheet, config, body);
    notifyTeam_(body);
    if (SEND_ACKNOWLEDGEMENT) {
      acknowledge_(body);
    }

    return json_({ ok: true });
  } catch (err) {
    // Returning non-ok makes the Worker retry, and leaves the lead flagged
    // undelivered in KV so it is recoverable either way.
    console.error('lead intake failed: ' + err);
    return json_({ ok: false, error: 'exception' });
  }
}

/** Lets you confirm the deployment is reachable in a browser. */
function doGet() {
  return json_({ ok: true, service: 'samoracare-lead-intake' });
}

// ---------------------------------------------------------------------------
// Sheet
// ---------------------------------------------------------------------------

function getSheet_(config) {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(config.tab);
  if (!sheet) {
    sheet = book.insertSheet(config.tab);
  }
  // Write the header row if the tab is new, so setup is not a manual step.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(config.columns);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, config.columns.length).setFontWeight('bold');
  }
  return sheet;
}

function alreadySeen_(sheet, leadId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  // lead_id is column B in both tabs.
  var ids = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (ids[i][0] === leadId) return true;
  }
  return false;
}

function appendRow_(sheet, config, body) {
  var row = config.columns.map(function (name) {
    if (name === 'received_at') return new Date();
    var value = body[name];
    return value === undefined || value === null ? '' : value;
  });
  sheet.appendRow(row);
}

// ---------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------

var LABELS = {
  fullName: 'Name',
  email: 'Email',
  phone: 'Phone',
  inquiring_for: 'Asking for',
  state: 'State',
  date_of_birth: 'Date of birth',
  receiving_benefits: 'Already receiving a benefit',
  owes_overpayment: 'Owes SSA an overpayment',
  health_conditions: 'Health conditions affect daily life',
  first_time_applying: 'Applied before',
  conditions: 'Conditions, in their words',
  seeing_doctors: 'Seeing doctors',
  last_able_to_work: 'Last able to work',
  job_title: 'Kind of work',
  sms_consent: 'Agreed to texts',
};

function notifyTeam_(body) {
  var config = SHEETS[body.type];
  var source = body.type === 'register' ? 'register form' : 'screener';
  var phone = body.phone ? (body.countryCode || '') + ' ' + body.phone : 'not given';

  var lines = [];
  config.columns.forEach(function (name) {
    if (name === 'received_at' || name === 'lead_id') return;
    if (name === 'countryCode') return;
    if (name === 'phone') {
      lines.push('Phone: ' + phone);
      return;
    }
    var value = body[name];
    if (value === undefined || value === null || value === '') return;
    lines.push((LABELS[name] || name) + ': ' + value);
  });

  var subject = 'New lead: ' + (body.fullName || 'unnamed') + ' (' + source + ')';
  var text =
    'A new lead came in from the ' + source + '.\n\n' +
    lines.join('\n') + '\n\n' +
    'Reply to them directly at ' + (body.email || 'no email given') + '.\n' +
    (body.sms_consent === 'yes'
      ? 'They agreed to receive text messages.\n'
      : 'They did NOT agree to text messages — do not text this number.\n') +
    '\nReference: ' + (body.lead_id || 'none') + '\n';

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: subject,
    body: text,
    name: SENDER_NAME,
    replyTo: body.email || undefined,
  });
}

function acknowledge_(body) {
  if (!body.email) return;
  var first = String(body.fullName || '').split(' ')[0] || 'there';
  MailApp.sendEmail({
    to: body.email,
    subject: 'We have your details — SamoraCare',
    name: 'SamoraCare',
    replyTo: NOTIFY_EMAIL,
    body:
      'Hi ' + first + ',\n\n' +
      'Thank you for reaching out. We have your answers and an advocate will ' +
      'follow up, usually the same day, by phone, text or email — whichever ' +
      'you prefer.\n\n' +
      'If you would rather not wait, call us on (253) 766-5260 or reply to ' +
      'this email.\n\n' +
      'Nothing here is legal or medical advice, and reaching out does not ' +
      'guarantee approval or any particular outcome.\n\n' +
      'SamoraCare\n' +
      'Samora AI, Inc.\n',
  });
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

/**
 * Run this once from the editor to check the whole path without the website:
 * it writes a row and sends the team email.
 */
function selfTest() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        type: 'register',
        lead_id: 'selftest-' + Date.now(),
        fullName: 'Self Test',
        email: 'team@samoracare.com',
        phone: '555 123 4567',
        countryCode: '+1',
        inquiring_for: 'myself',
        state: 'Washington',
        date_of_birth: '04/09/1971',
        receiving_benefits: 'no',
        owes_overpayment: 'no',
        health_conditions: 'yes',
        sms_consent: 'yes',
        token: getSharedToken_() || undefined,
      }),
    },
  });
  Logger.log(res.getContent());
}
