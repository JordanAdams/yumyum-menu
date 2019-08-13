const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const auth = require("koa-basic-auth");
const Stream = require("stream");
const tempWrite = require("temp-write");
const { createReadStream, unlink } = require("fs-extra");
const config = require("./config");
const gmail = require("./gmail");
const slack = require("./slack");

const app = new Koa();

app.use(bodyParser());
app.use(auth({ name: config.http.username, pass: config.http.password }));

app.use(async ctx => {
  const email = await gmail.getLatestYumYumMenuEmail();
  if (!email) {
    ctx.status = 500;
    ctx.body = "Failed to find menu email.";
  }

  const attachment = await gmail.getFirstMatchingAttachment(
    email,
    e => e.mimeType === "image/jpeg"
  );
  if (!attachment) {
    ctx.status = 500;
    ctx.body = "Missing attachment in latest email.";
  }

  const tempPath = await tempWrite(Buffer.from(attachment.data, "base64"));

  await slack.files.upload({
    file: createReadStream(tempPath),
    channels: config.slack.channelId,
    title: "Menu",
    initial_comment: `*${gmail.getSubject(email)}*` || "*Menu*"
  });

  await unlink(tempPath);

  ctx.status = 200;
});

app.listen(config.http.port, () =>
  console.log(`Listening on :${config.http.port}`)
);
