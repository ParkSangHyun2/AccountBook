var { connection } = require('../MysqlConnector');

function Receipt (model) {
  this.id = model.id;
  this.title = model.title;
  this.amount = model.amount;
  this.type = model.type;
  this.pocketId = model.pocket_id;
  this.date = model.date;
  this.contentType = model.contents_type;
}

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
      const receipts = rows.map(row => new Receipt(row));
      console.log(receipts);
      callback(receipts);
    }
  });
}

module.exports = { getReceipts };
