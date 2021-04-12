var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'sanghyunpark',
  password : 'qkrtkd12',
  database : 'accountbook'
});

module.exports = { connection };