var express = require('express');
var router = express.Router();
var { getReceipts } = require('../store/mysql/MainPageStore');

router.get('/main', async function(req, res, next) {
  //
  const type = req.query.type === 'INCOME';

  getReceipts(1, type, (results) => {

    res.render('MainPage', { results: JSON.stringify(results), type: type });
  });

});

router.get('/management', async function(req, res, next) {
  //
  res.render('ManagementPage', {});
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
