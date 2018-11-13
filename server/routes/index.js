const config = require('config')
const express = require('express')
const router = express.Router()
const aen = require('chain-js-sdk')
const op = require('rxjs/operators')

const MAX_AEN = parseInt(process.env.MAX_AEN || config.aen.max)
const MIN_AEN = parseInt(process.env.MIN_AEN || config.aen.min)
const OPT_AEN = parseInt(process.env.OPT_AEN || ~~((MAX_AEN + MIN_AEN) / 2))

const faucetAccount = aen.Account.createFromPrivateKey(
  process.env.PRIVATE_KEY,
  aen.NetworkType[process.env.NETWORK]
)
const API_URL = `${process.env.API_HOST}:${process.env.API_PORT}`
const accountHttp = new aen.AccountHttp(API_URL)
const mosaicService = new aen.MosaicService(
  accountHttp,
  new aen.MosaicHttp(API_URL),
  new aen.NamespaceHttp(API_URL)
)

router.get('/', function(req, res, next) {
  const address = req.query.address
  const message = req.query.message
  const encrypt = req.query.encrypt
  const mosaic  = req.query.mosaic
  const amount  = req.query.amount
  const drained = false

  accountHttp.getAccountInfo(faucetAccount.address)
    .pipe(
      op.mergeMap(account => {
        return mosaicService.mosaicsAmountViewFromAddress(faucetAccount.address)
          .pipe(
            op.mergeMap(_ => _),
            op.filter(mosaic => mosaic.fullName() === 'nem:xem'),
            op.toArray(),
            op.map(mosaics => { return {mosaics, account} })
          )
      })
    )
    .subscribe({
      next(data) {
        console.log(data)
        res.render('index', {
          drained: drained,
          txHash: req.flash('txHash'),
          error: req.flash('error'),
          xemMax: MAX_AEN / 1000000,
          xemMin: MIN_AEN / 1000000,
          xemOpt: OPT_AEN / 1000000,
          address: address,
          message: message,
          encrypt: encrypt,
          mosaic: mosaic,
          amount: amount,
          faucetAddress: data.account.address.pretty(),
          faucetAmount: data.mosaics[0].relativeAmount(),
          recaptcha_secret: process.env.RECAPTCHA_CLIENT_SECRET,
          network: process.env.NETWORK,
          apiHost: process.env.API_HOST,
          apiPort: process.env.API_PORT
        })
      },
      error(err) { next(err) },
      complete() {}
    })
})

module.exports = router
