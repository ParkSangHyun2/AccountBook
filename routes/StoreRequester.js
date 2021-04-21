var express = require('express');
var router = express.Router();
var { getReceipts} = require('../store/mysql/MainPageStore');


router.get('/receipt', function(req, res, next) {
  //
  const walletId = req.query.walletId;
  const type = req.query.type === 'INCOME';
  getReceipts(walletId, type, (results) => {
    res.json({results});
  });
});

module.exports = router;
