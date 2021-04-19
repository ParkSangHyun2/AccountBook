var { connection } = require('../MysqlConnector');

function saveReceipt(contents, amount, walletId, isIncome, callback) {
  //
  const receiptType = isIncome ? 'INCOME' : 'OUTCOME';
  connection.query(
    `
      INSERT INTO receipt(title, amount, type, pocket_id)
      VALUES('${contents}', ${amount}, '${receiptType}', 1);
    `
    , function(err, rows, fields) {
    if (err) {
      throw err
    } else {
      callback(true);
    }
  });
}

module.exports = { saveReceipt };
