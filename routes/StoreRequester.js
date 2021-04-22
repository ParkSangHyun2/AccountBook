var express = require('express');
var router = express.Router();

var { getReceipts, getAllMyPocket, getBankImage } = require('../store/mysql/MainPageStore');
var { saveWallet, mapWalletAndBank } = require('../store/mysql/ManagementStore');

router.get('/receipt', function(req, res, next) {
  //
  const walletId = req.query.walletId;
  const type = req.query.type === 'INCOME';
  getReceipts(walletId, type, (results) => {
    res.json({results});
  });
});

router.get('/wallet/bank/image', async function(req, res, next) {
  const walletId = req.query.walletId;

  const image = await getBankImage(walletId);
  const convertedImage = image.toString('utf-8');
  debugger;
  res.json({convertedImage});
});

router.post('/wallet', async function(req, res, next) {
  const result = req.body;

  saveWallet(result.name, result.purpose, result.nickname, result.image);
  const pockets = await getAllMyPocket();
  const savedModel = pockets.find(pocket => (pocket.name === result.name) && (pocket.purpose === result.purpose) && (pocket.nickname === result.nickname));

  res.json({savedModel});
});

router.post('/wallet/map', async function(req, res, next) {
  const result = req.body;

  mapWalletAndBank(result.walletId, result.bankId);
  res.status(200).send({ message: "Requested" });
});

module.exports = router;
