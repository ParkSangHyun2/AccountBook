var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port: 3306,
  user     : 'sanghyunpark',
  password : 'qkrtkd12',
  database : 'accountbook'
});

function healthCheck() {
  //
  // connection.connect();

  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('Mysql Connection OK..');
    console.dir(connection.config);
  });

  // connection.end();
}

module.exports = { connection, healthCheck };
