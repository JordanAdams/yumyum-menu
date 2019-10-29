"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var slack_1 = __importDefault(require("slack"));
var config_1 = __importDefault(require("./config"));
var slack = new slack_1["default"]({ token: config_1["default"].slack.token });
exports["default"] = slack;
//# sourceMappingURL=slack.js.map