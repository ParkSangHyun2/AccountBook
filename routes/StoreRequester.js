var express = require('express');
var router = express.Router();

var { getReceipts } = require('../store/mysql/MainPageStore');
var { saveWallet } = require('../store/mysql/ManagementStore');

router.get('/receipt', function(req, res, next) {
  //
  const walletId = req.query.walletId;
  const type = req.query.type === 'INCOME';
  getReceipts(walletId, type, (results) => {
    res.json({results});
  });
});

router.post('/wallet', async function(req, res, next) {
  const result = req.body;

  saveWallet(result.name, result.purpose, result.nickname, result.image);
  res.status(200).send({ message: "Requested" });
});

module.exports = router;
