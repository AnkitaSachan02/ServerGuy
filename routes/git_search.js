var express = require("express");
var router = express.Router();
var request = require("request-promise");

let ua =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36";
/* GET users listing. */
router.get("/search", async function(req, res, next) {
  try {
    if (typeof req.query.params === "string") {
      req.query.params = JSON.parse(req.query.params);
    }
    let result = await request({
      url: `https://api.github.com/search/repositories?q=topic:${
        req.query.params.searchTopic
      }&sort=stars&order=asc&page=1`,
      headers: {
        "User-Agent": ua
      }
    });
    console.log(JSON.parse(result).items.length);
    res.send({ item: JSON.parse(result).items });
  } catch (err) {
    console.log("errpr", err);
  }
});

module.exports = router;
