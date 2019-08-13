const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  http: {
    port: process.env.PORT || 3000,
    username: process.env.HTTP_USERNAME,
    password: process.env.HTTP_PASSWORD
  },
  google: {
    access_token: process.env.GOOGLE_ACCESS_TOKEN,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  }
};
