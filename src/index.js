const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const auth = require("koa-basic-auth");
const config = require("./config");

const app = new Koa();

app.use(bodyParser());
app.use(auth({ name: config.http.username, pass: config.http.password }));

app.use(async ctx => {
  ctx.status = 200;
});

app.listen(config.http.port, () =>
  console.log(`Listening on :${config.http.port}`)
);
