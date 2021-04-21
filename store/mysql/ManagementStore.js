var { connection } = require('../MysqlConnector');

function saveReceipt(contents, amount, walletId, isIncome, date, callback) {
  //
  const receiptType = isIncome ? 'INCOME' : 'OUTCOME';
  connection.query(
    `
      INSERT INTO receipt(title, amount, type, pocket_id, date)
      VALUES('${contents}', ${amount}, '${receiptType}', 1, '${date}');
    `
    , function(err, rows, fields) {
    if (err) {
      throw err
    } else {
      callback(true);
    }
  });
}

function saveWallet(name, purpose, nickname, image) {
  //
  const query =     `
      INSERT INTO my_pocket(name, purpose, nickname, image)
      VALUES('${name}', '${purpose}', '${nickname}', '${image}');
    `
  ;
  connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log('saveWallet => ' + err);
      }
    });
}

module.exports = { saveReceipt, saveWallet };
