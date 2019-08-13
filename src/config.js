if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  http: {
    port: process.env.PORT || 3000,
    username: process.env.HTTP_USERNAME,
    password: process.env.HTTP_PASSWORD
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN
  },
  slack: {
    token: process.env.SLACK_TOKEN,
    channelId: process.env.SLACK_CHANNEL_ID
  }
};
