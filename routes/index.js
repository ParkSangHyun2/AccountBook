var express = require('express');
var router = express.Router();
const { getSample } = require('../store/mysql/SampleStore');
var { connection } = require('../store/MysqlConnector');



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

module.exports = router;
