import config from "./config";
import { google } from "googleapis";

export const googleAuth = new google.auth.OAuth2({
  clientId: config.google.clientId,
  clientSecret: config.google.clientSecret
});

googleAuth.setCredentials({
  refresh_token: config.google.refreshToken,
  access_token: config.google.accessToken
});
