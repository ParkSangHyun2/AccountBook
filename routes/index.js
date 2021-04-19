var express = require('express');
var router = express.Router();
const { getSample } = require('../store/mysql/SampleStore');
var { connection } = require('../store/MysqlConnector');
const { saveReceipt } = require('../store/mysql/ManagementStore');



//단순 랜더
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name: 'tester' });
});

router.get('/home', async function(req, res, next) {
  //
  getSample((result) => {
    res.render('home', { title: 'hello', result });
  });
});

//데이터 가공시..GET
router.get('/sample', function(req, res, next) {
  //
  const results = new Promise(resolve => {
    let results = connection.query('SELECT * FROM student_tb', function(err, rows, fields) {
      if (err) throw err;
      resolve(rows);
      return res.json({data: rows});
    });
  })

  results.then((results) => {
    console.log(JSON.stringify(results));
  })

});


router.get('/profile', function(req, res, next) {
  //
  res.render('profile');
});

router.get('/statistics', function(req, res, next) {
  //
  res.render('statistics');
});


router.get('/sidebar', function(req, res, next) {
  //
  res.render('sidebar', { });
});

router.get('/management', async function(req, res, next) {
  //
  res.render('management', {});
});

router.post('/management/save', async function(req, res, next) {
  const result = req.body;

  saveReceipt(result.contents, result.amount, result.walletId, result.isIncome, () => {console.log('저장되었습니다.')})
  res.render('management', {popup: '저장되었습니다.'});
});

module.exports = router;
