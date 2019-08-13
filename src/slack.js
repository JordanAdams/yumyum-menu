const Slack = require("slack");
const config = require("./config");

const slack = new Slack({ token: config.slack.token });

module.exports = slack;
