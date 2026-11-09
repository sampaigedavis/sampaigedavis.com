/**
 * Sam Paige Davis — Connect form → Google Sheet
 *
 * Setup (once):
 * 1. Create a Google Sheet (e.g. "Website Contact Form").
 * 2. In the sheet: Extensions > Apps Script. Delete the sample code, paste this file, Save.
 * 3. Deploy > New deployment > type "Web app".
 *      Execute as: Me      Who has access: Anyone
 *    Click Deploy, approve the permissions, and copy the Web app URL (ends in /exec).
 * 4. Paste that URL into connect/index.html where it says YOUR_APPS_SCRIPT_URL.
 *
 * Each submission adds a row to the "Submissions" tab and (optionally) emails Sam.
 */

const SHEET_NAME = 'Submissions';
const NOTIFY_EMAIL = 'sam@sampaigedavis.com'; // set to '' to turn off email notifications
const HEADERS = ['Submitted', 'Name', 'Email', 'Reaching out about', 'Message'];

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Spam trap: real visitors never fill the hidden "_gotcha" field.
  if (p._gotcha) return ok_();

  const name = clean_(p.name);
  const email = clean_(p.email);
  const topic = clean_(p.topic);
  const message = clean_(p.message, 5000);
  if (!name || !email) return ok_();

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    sheet.appendRow([new Date(), name, email, topic, message]);
  } finally {
    lock.releaseLock();
  }

  if (NOTIFY_EMAIL) {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: 'New website message: ' + (topic || 'Connect form') + ' from ' + name,
      body:
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Reaching out about: ' + topic + '\n\n' +
        message + '\n\n' +
        '(Sent from the Connect form on sampaigedavis.com. Reply to this email to answer ' + name + ' directly.)'
    });
  }
  return ok_();
}

// Visiting the web app URL in a browser shows this, which is handy for checking the deployment.
function doGet() {
  return ContentService.createTextOutput('Sam Paige Davis contact form endpoint is running.');
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function clean_(v, max) {
  v = String(v == null ? '' : v).trim().slice(0, max || 500);
  // Stop spreadsheet formula injection (values starting with = + - @).
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function ok_() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
