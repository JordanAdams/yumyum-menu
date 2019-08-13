const { google } = require("googleapis");
const { DateTime } = require("luxon");
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

const getLatestYumYumMenuEmail = async () => {
  const today = DateTime.local().toFormat("yyyy/MM/dd");
  const q = `from:cafe.yumyum@outlook.com has:attachment after:${today}`;

  return findEmail(q);
};

const getFirstMatchingAttachment = async (email, predicate) => {
  const part = email.payload.parts.find(predicate);
  if (!part) {
    return null;
  }

  const resp = await gmail.users.messages.attachments.get({
    userId: "me",
    messageId: email.id,
    id: part.body.attachmentId
  });

  return resp.data || null;
};

const getSubject = email => {
  const subjectHeader = email.payload.headers.find(h => h.name === "Subject");
  return subjectHeader ? subjectHeader.value : null;
};

module.exports = {
  getLatestYumYumMenuEmail,
  getFirstMatchingAttachment,
  getSubject
};
