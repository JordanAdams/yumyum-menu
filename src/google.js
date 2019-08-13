const config = require("./config");
const { google } = require("googleapis");

const auth = new google.auth.OAuth2({
  clientId: config.google.clientId,
  clientSecret: config.google.clientSecret
});

auth.setCredentials({
  refresh_token: config.google.refreshToken,
  access_token: config.google.accessToken
});

module.exports = { auth };
