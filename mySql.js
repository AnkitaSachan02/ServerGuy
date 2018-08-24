var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12253212",
  password: "7eQG1tfLvp",
  database: "sql12253212"
});

module.exports = connection;