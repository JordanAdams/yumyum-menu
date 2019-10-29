"use strict";
exports.__esModule = true;
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
var hasEnv = function (key) { return process.env.hasOwnProperty(key); };
var env = function (key, fallback) {
    return hasEnv(key) ? process.env[key] : fallback;
};
var intEnv = function (key, fallback) {
    return hasEnv(key) ? parseInt(env(key, "")) : fallback;
};
var boolEnv = function (key, fallback) {
    if (fallback === void 0) { fallback = true; }
    return env(key, String(fallback)) === "true";
};
var config = {
    http: {
        port: intEnv("PORT", 3000)
    },
    google: {
        clientId: env("GOOGLE_CLIENT_ID"),
        clientSecret: env("GOOGLE_CLIENT_SECRET"),
        accessToken: env("GOOGLE_ACCESS_TOKEN"),
        refreshToken: env("GOOGLE_REFRESH_TOKEN")
    },
    slack: {
        token: env("SLACK_TOKEN"),
        channelId: env("SLACK_CHANNEL_ID")
    },
    features: {
        dateFilter: boolEnv("FEATURE_DATE_FILTER", true)
    }
};
exports["default"] = config;
//# sourceMappingURL=config.js.map