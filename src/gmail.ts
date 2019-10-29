import { google } from "googleapis";
import { googleAuth } from "./google";
import { Maybe } from "monet";

const gmail = google.gmail({ version: "v1", auth: googleAuth });

const getEmail = async (id: string): Promise<Maybe<>> => {
  const resp = await gmail.users.messages.get({ userId: "me", id });
  return resp.data;
};

export const findEmail = async (q: string) => {
  const resp = await gmail.users.messages.list({ userId: "me", q });
  const { messages = [] } = resp.data || {};
  if (messages.length < 1) {
    return null;
  }

  return getEmail(messages[0].id);
};

export const getSubjectFromEmail = email => {
  const subjectHeader = email.payload.headers.find(h => h.name === "Subject");
  return subjectHeader ? subjectHeader.value : null;
};

export const extractHtmlFromEmail = email => {
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
