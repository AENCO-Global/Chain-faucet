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
* `PRIVATE_KEY` - Private Key of the wallet to use for distribution
* `MIN_XEM` - The minimum amount that may be paid out in any single transaction
* `MAX_XEM` - The maximum amount that may be paid out in any single transaction
* `OPT_XEM` - Default value used if user requesting a fixed amount of XEM
* `ENOUGH_BALANCE` - If wallet requesting XEM has a balance greater than this value, don't allow any more to be claimed
* `MAX_UNCONFIRMED` - If the Faucet is waiting for this value of transactions to be complete, temporarily halt service
* `WAIT_HEIGHT` - If Faucet is this value blocks behind the network, temporarily halt service
* `RECAPTCHA_CLIENT_SECRET` - If wanting to integrate Google recaptcha challenge, client side secret to send to Google
* `RECAPTCHA_SERVER_SECRET` - If wanting to integrate Google recaptcha challenge, business side secret to send to Google

## Bare Metal Usage

```
# install packages
$ npm install

# start app
$ npm start

# or for development
$ npm run dev
```

## Docker Usage

There is a Docker image available for public use which will either support the
aforementioned configuration variables being present in the environment or
mapping a [dotenv](https://github.com/motdotla/dotenv) in to the container at
instantiation.

```
# Pull the latest Docker image
docker pull aenco/faucet

# Create a dotenv file for use
cat > $(pwd)/dotenv <<EOL
COOKIE_SECRET=placeholder
PORT=9999
NETWORK=PUBLIC_TEST
API_HOST=http://api-2.aencoin.io
API_PORT=3000
PRIVATE_KEY=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
MIN_XEM=1000000000
MAX_XEM=2000000000
OPT_XEM=
ENOUGH_BALANCE=20000000000
MAX_UNCONFIRMED=5
WAIT_HEIGHT=0
RECAPTCHA_CLIENT_SECRET=
RECAPTCHA_SERVER_SECRET=
EOL

# Fire up the container
docker run -it -d -p 9999:9999 -v $(pwd)/dotenv:/root/.aen/faucet/.env aenco/faucet

# Open up your browser to port 9999
```

## Heroku Deployment

This project supports Heroku deployment out of the box. For details, see the `Procfile` in project root
