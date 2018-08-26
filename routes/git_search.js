var express = require("express");
var router = express.Router();
var request = require("request-promise");
let connection = require("../mySql");

let ua =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36";
/* GET users listing. */
router.get("/search", async function(req, res, next) {
  try {
    if (typeof req.query.params === "string") {
      req.query.params = JSON.parse(req.query.params);
    }
    let { searchTopic, user } = req.query.params;
    let isMail = void 0;
    let query = `select * from user where`;
    if(user.indexOf("@") > -1){
      query+=` email="${user}"`;
      isMail = true; 
    } else {
        query+=` username = "${user}"`;
    }
    await connection.query(query,async function (error, rows, fields) {
      if (error) throw error;
      if( rows  && rows.length){
        let result = await request({
          url: `https://api.github.com/search/repositories?q=topic:${searchTopic}&sort=stars&order=asc&page=1`,
          headers: {"User-Agent": ua}
        });
        let q = `UPDATE user SET SEARCHES = `;
        let row = rows[0];
        let { searches } = row;
        let searchesToBeSaved = void 0;
        if(searches){
          let searchesArray = searches.split(", ");
          let searchIndex = searchesArray.indexOf(searchTopic)
          if(searchIndex === -1){
            if(searchesArray.length === 5){
              searchesArray.shift();
            }
          } else {
            searchesArray.splice(searchIndex,1);
          }
          searchesArray.push(searchTopic);
          searchesToBeSaved = searchesArray.join(", ")
        } else {
          searchesToBeSaved = searchTopic;
        }
        q += `"${searchesToBeSaved}" where ${isMail ? "email" : "username"} = "${user}"`
        await connection.query(q);
        res.send({ item: JSON.parse(result).items });
      } else {
        res.send({error:"User doesn't exist. Please sign-up first...!"})
      }
   })
  } catch (err) {
    // do nothing
  }
});

router.post("/search-history", async function(req, res, next) {
  let data = req.body;
  let { user } = data;
  try {
    let query = `select * from user where`;
    if(user.indexOf("@") > -1){
      query+=` email="${user}"`;
    } else {
      query+=` username = "${user}"`;
    }
    await connection.query(query,async function (error, rows, fields) {
      if (error) throw error;
      if( rows  && rows.length){
        let searches = rows[0].searches;
        if(searches)
          res.send({searches});
        else
          res.send({error:"No history found...!"})
      } else {
        res.send({error:"Please sign-up first...!"})
      }
   })
  } catch (err) {
    // do nothing
  }
});

module.exports = router;
