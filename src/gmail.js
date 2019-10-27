const { google } = require("googleapis");
const { auth } = require("./google");

const gmail = google.gmail({ version: "v1", auth });

const getEmail = async id => {
  const resp = await gmail.users.messages.get({ userId: "me", id });
  return resp.data || null;
};

const findEmail = async q => {
  const resp = await gmail.users.messages.list({ userId: "me", q });
  const { messages = [] } = resp.data || {};
  if (messages.length < 1) {
    return null;
  }

  return getEmail(messages[0].id);
};

const getSubjectFromEmail = email => {
  const subjectHeader = email.payload.headers.find(h => h.name === "Subject");
  return subjectHeader ? subjectHeader.value : null;
};

const extractHtmlFromEmail = email => {
  const parts = email.payload.parts;

  const htmlPart = parts.find(part => part.mimeType === "text/html");
  if (!htmlPart) {
    return null;
  }

  return Buffer.from(htmlPart.body.data, "base64").toString();
};

module.exports = {
  getSubjectFromEmail,
  findEmail,
  extractHtmlFromEmail
};
