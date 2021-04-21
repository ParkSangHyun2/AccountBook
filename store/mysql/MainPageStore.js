var { connection } = require('../MysqlConnector');
var moment = require('moment');

function Receipt (model) {
  this.id = model.id;
  this.title = model.title;
  this.amount = model.amount;
  this.type = model.type;
  this.pocketId = model.pocket_id;
  this.date = model.date;
  this.contentType = model.contents_type;
}

function MyPocket(model) {
  this.id = model.id;
  this.name = model.name;
  this.purpose = model.purpose;
  this.nickname = model.nickname;
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

function getReceiptInThisMonth(walletId) {
  //
  const query =
    (`
      SELECT *
      FROM receipt
      WHERE pocket_id=${walletId} and date BETWEEN '${moment().startOf('month').format('YYYY-MM-DD')}' AND '${moment().endOf('month').format('YYYY-MM-DD')}' ;
    `);

  return new Promise((resolve) => {
    //
    connection.query(query, function(err, rows, fields) {
      //
        console.log(query);
        if (err) {
          throw err
        } else {
          const receipts = rows.map(row => new Receipt(row));
          resolve(receipts);
        }
      });
  });
}

function getTotalCount(walletId) {
  //
  const query =
    (`
      COUNT *
      FROM receipt
    `);

  return new Promise((resolve) => {
    //
    connection.query(query, function(err, rows, fields) {
      //
      if (err) {
        throw err
      } else {
        const receipts = rows.map(row => new Receipt(row));
        resolve(receipts);
      }
    });
  });
}

function getAllReceipts(walletId) {
  //
  const query =
    (`
      SELECT *
      FROM receipt
      WHERE pocket_id=${walletId}
    `);

  return new Promise((resolve) => {
    //
    connection.query(query, function (err, rows, fields) {
      //
      if (err) {
        throw err
      } else {
        const receipts = rows.map(row => new Receipt(row));
        resolve(receipts);
      }
    });
  });
}

function getAllMyPocket() {
  //
  const query =
    (`
      SELECT *
      FROM my_pocket;
    `);

  return new Promise((resolve) => {
    //
    connection.query(query, function (err, rows, fields) {
      //
      if (err) {
        throw err
      } else {
        const myPockets = rows.map(row => new MyPocket(row));
        resolve(myPockets);
      }
    });
  });
}

module.exports = { getReceipts, getReceiptInThisMonth, getAllReceipts, getTotalCount, getAllMyPocket };
