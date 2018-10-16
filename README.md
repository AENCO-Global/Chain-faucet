# AEN Faucet

The purpose of this project is to provide a service with which users of the AENChain network can retrieve trace amounts of coin, typically used for performing experimentats on the network soon after joining. 

## Summary

This is a NodeJS 8+ which is configured through either user environment variables or the [dotenv](https://www.npmjs.com/package/dotenv) module. It is built using a combination of [Express](https://github.com/expressjs/express) and [Beauter](http://beauter.outboxcraft.com/)

## Configuration

* `COOKIE_SECRET` - A unique salt which would be used to encode client side storage. Currently unused
* `PORT` - The port that Node will expose the service on
* `NETWORK` - Network Identifier according to the underlying chain SDK used
* `API_HOST` - World reachable IP address / domain name used as a path to REST Gateway (not aen.server)
* `API_PORT` - The port exposed by the REST gateway for communication
* `PRIVATE_KEY` - *TODO* Currently experimenting with best key to use. Using supply account
* `MIN_XEM` - The minimum amount that may be paid out in any single transaction
* `MAX_XEM` - The maximum amount that may be paid out in any single transaction
* `OPT_XEM` - Default value used if user requesting a fixed amount of XEM
* `ENOUGH_BALANCE` - If wallet requesting XEM has a balance greater than this value, don't allow any more to be claimed
* `MAX_UNCONFIRMED` - If the Faucet is waiting for this value of transactions to be complete, temporarily halt service
* `WAIT_HEIGHT` - If Faucet is this value blocks behind the network, temporarily halt service
* `RECAPTCHA_CLIENT_SECRET` - If wanting to integrate Google recaptcha challenge, client side secret to send to Google
* `RECAPTCHA_SERVER_SECRET` - If wanting to integrate Google recaptcha challenge, business side secret to send to Google

## Usage

```
# install packages
$ npm install

# start app
$ npm start

# or for development
$ npm run dev
```

## Heroku Deployment

This project supports Heroku deployment out of the box. For details, see the `Procfile` in project root