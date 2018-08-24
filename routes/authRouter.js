let router = require("express").Router();
let passport = require("passport");
let connection = require("../mySql");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/redirect", passport.authenticate("google",{ session: false }), (req, res) => {
  res.redirect(`http://localhost:3000/gitRepositories/${req.user.email}`);
});

router.get( "/facebook", passport.authenticate("facebook"));

router.get("/fredirect", passport.authenticate("facebook",{ session: false }), (req, res) => {
  res.redirect(`http://localhost:3000/gitRepositories/`);
});

router.post("/sign-up", async (req,res) => {
    let data = req.body;
    let {username, email, password} = data;
    let query = `select * from user where username = "${username}" or email="${email}"`;
    try {
        await connection.query(query,async function (error, rows, fields) {
            if (error) throw error;
            if( !rows || !rows.length ){
                let q = `INSERT INTO user (username, email, password ) VALUES ("${username}", "${email}", "${password}")`;
                await connection.query(q, function (err, result) {
                    if (err) throw err;
                    res.send(result);
                })
            } else {
                res.send({error:"user already exist...!"})
            }
        })
    } catch(err){
        console.log("error in sign up>>>>>> ",err);
    }
});

router.post("/login", async (req,res) => {
    let data = req.body;
    let {username, password} = data;
    let query = `select * from user where`;
    try {
        if(username.indexOf("@") > -1){
           query += ` email="${username}"`;
        } else {
            query += ` username = "${username}"`;
        }
        await connection.query(query,async function (error, rows, fields) {
            if (error) throw error;
            if( rows  && rows.length){
                let row = rows[0];
                if(row.password === password){
                    res.send(row);
                } else {
                    res.send({error:"Password is incorrect. Please check the credentials...!"})
                }
            } else {
                res.send({error:"User doesn't exist. Please sign-up first...!"})
            }
        })
    } catch(err){
        console.log("error in sign up>>>>>> ",err);
    }
});

module.exports = router;
