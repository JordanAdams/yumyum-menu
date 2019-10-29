"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var config_1 = __importDefault(require("./config"));
var googleapis_1 = require("googleapis");
exports.googleAuth = new googleapis_1.google.auth.OAuth2({
    clientId: config_1["default"].google.clientId,
    clientSecret: config_1["default"].google.clientSecret
});
exports.googleAuth.setCredentials({
    refresh_token: config_1["default"].google.refreshToken,
    access_token: config_1["default"].google.accessToken
});
//# sourceMappingURL=google.js.map