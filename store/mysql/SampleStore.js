var { connection } = require('../MysqlConnector');

function getNewsList() {
    //
    // connection.connect();

    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
    });

    // connection.end();
}

function getSample(callback) {
    //
    return connection.query('SELECT * FROM student_tb', function(err, rows, fields) {
        if (err) throw err;
        callback(rows);
        });
}

module.exports = { getNewsList, getSample };
