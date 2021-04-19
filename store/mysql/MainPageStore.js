var { connection } = require('../MysqlConnector');

function getReceipts(walletId, isIncome, callback) {
  //
  const receiptType = isIncome ? 'INCOME' : 'OUTCOME';

  connection.query(
    `
      SELECT *
      FROM receipt
      WHERE type='${receiptType}' and pocket_id=${walletId};
    `
    , function(err, rows, fields) {
    if (err) {
      throw err
    } else {
      callback(rows);
    }
  });
}

module.exports = { getReceipts };
