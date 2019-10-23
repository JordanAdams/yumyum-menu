const { DateTime } = require("luxon");
const { findEmail } = require("./gmail");
const cheerio = require("cheerio");

const LOGO_URL =
  "https://gallery.mailchimp.com/960535dd9067bb938d37f961b/images/36ca8e6b-70cc-4ab5-82ca-952c29e8b00c.png";

const fetchLatestMenuEmail = () => {
  const today = DateTime.local().toFormat("yyyy/MM/dd");
  const q = `from:cafe.yumyum@outlook.com after:${today}`;

  return findEmail(q);
};

const extractMenuImageUrl = html => {
  const dom = cheerio.load(html);
  const images = dom("img").toArray();
  const urls = images.map(image => image.attribs.src);

  const matchingUrls = urls
    .filter(url => url.match("gallery.mailchimp.com"))
    .filter(url => !url.match(LOGO_URL));

  return matchingUrls[0] || null;
};

module.exports = { fetchLatestMenuEmail, extractMenuImageUrl };
