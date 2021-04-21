var express = require('express');
var router = express.Router();
var { getReceipts, getReceiptInThisMonth, getAllReceipts, getTotalCount, getAllMyPocket } = require('../store/mysql/MainPageStore');

/* 메인페이지 */
router.get('/main', async function(req, res, next) {
  //
  const type = req.query.type === 'INCOME';
  /* 지갑의 배열을 가지고 온다.*/
  const myPockets = await getAllMyPocket();

  getReceipts(1, type, (results) => {
    res.render('MainPage', { results: results, type: type, pocketList: myPockets /* pocketList 라는 이름으로 화면에서 사용할수 있게함*/});
  });

});


router.get('/management', async function(req, res, next) {
  //
  var results = await getReceiptInThisMonth(1);
  var incomes = results.filter(result => result.type === 'INCOME').map(result => result.amount).reduce((acc, next) => acc + next);
  var outcomes = results.filter(result => result.type === 'OUTCOME').map(result => result.amount).reduce((acc, next) => acc + next);

  // const totalCount = await getTotalCount(1);
  const allReceipts = await getAllReceipts(1);

  res.render('ManagementPage', { incomes: incomes, outcomes: outcomes, allReceipts: allReceipts });

});

router.get('/profile', async function(req, res, next) {
  //
  res.render('ProfilePage', {});
});

router.get('/statistics', async function(req, res, next) {
  //
  res.render('StatisticsPage', {});
});


module.exports = router;
