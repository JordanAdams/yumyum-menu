const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const config = require("./config");
const gmail = require("./gmail");
const slack = require("./slack");
const yumyum = require("./yumyum");
const axios = require("axios");

const app = new Koa();

app.use(bodyParser());

app.use(async ctx => {
  const email = await yumyum.fetchLatestMenuEmail();
  if (!email) {
    ctx.status = 500;
    ctx.body = "Failed to find menu email.";
  }

  const html = gmail.extractHtmlFromEmail(email);
  if (!html) {
    ctx.status = 500;
    ctx.body = "Email has no html.";
  }

  const imageUrl = yumyum.extractMenuImageUrl(html);

  const imageResponse = await axios({
    method: "get",
    url: imageUrl,
    responseType: "stream"
  });

  await slack.files.upload({
    file: imageResponse.data,
    channels: config.slack.channelId,
    title: "Menu",
    initial_comment: `*${gmail.getSubjectFromEmail(email)}*` || "*Menu*"
  });

  ctx.status = 200;
});

app.listen(config.http.port, () =>
  console.log(`Listening on :${config.http.port}`)
);
