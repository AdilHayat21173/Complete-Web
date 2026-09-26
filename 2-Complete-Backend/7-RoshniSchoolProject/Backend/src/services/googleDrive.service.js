// src/services/googleDrive.service.js
// Generic Drive read/write for a raw .xlsx file's bytes.
// Used by both the Fee System and the Result System, each pointing at
// a different Drive file ID, sharing the same Google account access.

require("dotenv").config();
const { google } = require("googleapis");
const stream = require("stream");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
  throw new Error(
    "Missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN in .env"
  );
}

const oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const drive = google.drive({ version: "v3", auth: oAuth2Client });

const XLSX_MIME =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

async function downloadFileBuffer(fileId) {
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "arraybuffer" }
  );
  return Buffer.from(res.data);
}

// For a NATIVE Google Sheet (created in Sheets, not an uploaded .xlsx).
// These can't be downloaded with alt=media; they have to be exported.
async function downloadGoogleSheetBuffer(fileId) {
  const res = await drive.files.export(
    { fileId, mimeType: XLSX_MIME },
    { responseType: "arraybuffer" }
  );
  return Buffer.from(res.data);
}

// Auto-detects which download method a file actually needs, instead of
// the caller having to know/guess. A docs.google.com/spreadsheets/... link
// doesn't guarantee the file is truly a native Sheet internally — Drive
// sometimes keeps an uploaded .xlsx in its original binary format even
// though it opens in the Sheets editor. Checking the real mimeType first
// avoids the "Export only supports Docs Editors files" error either way.
async function downloadWorkbookBufferAuto(fileId) {
  const meta = await drive.files.get({ fileId, fields: "mimeType" });
  const isNativeGoogleSheet = meta.data.mimeType === "application/vnd.google-apps.spreadsheet";
  return isNativeGoogleSheet ? downloadGoogleSheetBuffer(fileId) : downloadFileBuffer(fileId);
}

async function uploadFileBuffer(fileId, buffer) {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(buffer);

  await drive.files.update({
    fileId,
    media: { mimeType: XLSX_MIME, body: bufferStream },
  });
}

module.exports = {
  downloadFileBuffer,
  downloadGoogleSheetBuffer,
  downloadWorkbookBufferAuto,
  uploadFileBuffer,
};