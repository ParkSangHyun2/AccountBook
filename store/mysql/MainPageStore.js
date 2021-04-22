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
  this.image = model.image.toString('utf-8');
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
        SELECT count(*) AS counts
        FROM receipt
        WHERE pocket_id=${walletId}
    `);

  return new Promise((resolve) => {
    //
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      //
      if (err) {
        throw err
      } else {
        resolve(rows[0].counts);
      }
    });
  });
}

function getAllBank() {
  //
  const query =
    (`
      SELECT *
      FROM financial_institution
    `);

  return new Promise((resolve) => {
    //
    console.log(query);
    connection.query(query, function(err, rows, fields) {
      //
      if (err) {
        throw err
      } else {
        resolve(rows);
      }
    });
  });
}

function getAllReceipts(walletId, page) {
  //
  /* 테이블에서 한번에 보여줄 row 갯수 */
  const LIMIT = 5;

  /* pocket_id에 해당하는 전체리스트를 가지고오되, 선택한 page에 해당하는 데이터만 쿼리 */
  const query =
    (`
      SELECT *
      FROM receipt
      WHERE pocket_id=${walletId}
      ORDER BY date DESC
      LIMIT ${(page - 1) * LIMIT},${LIMIT};
    `);

  /* JS는 기본적으로 비동기(요청에 대한 응답이 바로오지않는경우 다음코드로 그냥 넘어감 - 여기서는 DB에 접근을해서 가져오기때문에 바로응답이 오지않음)
  *  그래서 Promise를 사용하는데, Promise는 우선 순차적으로 처리될 내용을 내부 콜백함수에 정의해놓고, 다음코드로 넘어가긴하지만 결과적으로는 받은 결과값을 언젠가는 다음코드가 볼수 있게 보관(유지)해주는 역할
  *  만약 Promise를 쓰지않았다면 이함수내에서 쿼리를 하고 리턴을 받는 또다른 함수에서는 undefined 가 넘거가겠지만 Promise를 사용하면 일단 Promise를 리턴받고 언젠가는Promise내부에서 처리된 내용이 리턴을 받는 또다른 함수에서 정상적으로 받을수 있게해줌
  */
  return new Promise((resolve) => {
    //
    connection.query(query, function (err, rows, fields) {
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

function getBankImage(walletId) {
  //
  const query =
    (`
        SELECT image
        FROM financial_institution fi
        WHERE id = (
            SELECT financial_institution_id
            FROM my_pocket_financial_institution mpfi
            WHERE my_pocket_id = ${walletId}
        )
    `);

  return new Promise((resolve) => {
    //
    connection.query(query, function (err, rows, fields) {
      //
      if (err) {
        throw err
      } else {
        const image = rows[0].image;
        resolve(image);
      }
    });
  });
}

module.exports = { getReceipts, getReceiptInThisMonth, getAllReceipts, getTotalCount, getAllMyPocket, getAllBank, getBankImage };
