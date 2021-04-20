var express = require('express');
var router = express.Router();
var { getReceipts, getReceiptInThisMonth } = require('../store/mysql/MainPageStore');

router.get('/main', async function(req, res, next) {
  //
  const type = req.query.type === 'INCOME';

  getReceipts(1, type, (results) => {

    res.render('MainPage', { results: results, type: type });
  });

});

router.get('/management', async function(req, res, next) {
  //
  var results = await getReceiptInThisMonth(1);
  var incomes = results.filter(result => result.type === 'INCOME').map(result => result.amount).reduce((acc, next) => acc + next);
  var outcomes = results.filter(result => result.type === 'OUTCOME').map(result => result.amount).reduce((acc, next) => acc + next);

  res.render('ManagementPage', { incomes: incomes, outcomes: outcomes });

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
