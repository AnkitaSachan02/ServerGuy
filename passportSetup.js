let passport = require("passport");
let googleStrategy = require("passport-google-oauth20");
let facebookStrategy = require("passport-facebook");
let connection = require("./mySql");

passport.serializeUser((user, done) => {
	console.log("in serializeUser", user);
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	console.log("in deserializeUser", id);
	done(null, id);
});

passport.use(new googleStrategy({
	callbackURL:'auth/redirect',
	clientID: "195195470406-mos65gc39rlktc8oj17553bpug6ff258.apps.googleusercontent.com",
	clientSecret: "DddUrblhv1hbcJNDwiQl2Ius", 
}, async function(accessToekn, refreshToken, profile, done){
    try{
        let { emails, id } = profile;
        let email = emails[0];
        email = email.value;
        let query = `select * from user where email="${email}"`;
        await connection.query(query,async function (error, rows, fields) {
            if (error) throw error;
            if( !rows || !rows.length ){
                let q = `INSERT INTO user (username, email, password ) VALUES ("${id}", "${email}", "${id}")`;
                await connection.query(q, function (err, result) {
                    if (err) throw err;
                })
            }
            let user= {
                id,
                email
            };
            done(null, user);
        })
    }catch(error){
        done(error, null);
    }
}))

passport.use(new facebookStrategy({
	callbackURL:'auth/fredirect',
	clientID: "542899819495663",
	clientSecret: "2951dbc2d13c4e0e2ac6e34b8c487e05", 
}, async function(accessToekn, refreshToken, profile, done){
	console.log("this is profile", JSON.stringify(profile));
    try{
        let user = {}
        done(null, user);
    }catch(error){
        done(error, null);
    }
}))