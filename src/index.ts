import Koa from "koa";
import bodyParser from "koa-bodyparser";
import config from "./config";
import { extractHtmlFromEmail, getSubjectFromEmail } from "./gmail";
import { uploadMenuImageToSlack } from "./slack";
import { fetchLatestMenuEmail, extractMenuImageUrl } from "./yumyum";
import axios from "axios";

const app = new Koa();

app.use(bodyParser());

app.use(async ctx => {
  const email = await fetchLatestMenuEmail();
  if (!email) {
    ctx.status = 500;
    ctx.body = "Failed to find menu email.";
    return;
  }

  const html = extractHtmlFromEmail(email);
  if (!html) {
    ctx.status = 500;
    ctx.body = "Email has no html.";
    return;
  }

  const imageUrl = extractMenuImageUrl(html);

  const imageResponse = await axios.get(imageUrl, {
    responseType: "stream"
  });

  await uploadMenuImageToSlack(imageResponse.data, {
    caption: getSubjectFromEmail(email)
  });

  ctx.status = 200;
});

app.listen(config.http.port, () =>
  console.log(`Listening on :${config.http.port}`)
);
