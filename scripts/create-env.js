const fs = require('fs')
fs.writeFileSync('./.env', `
CONSUMER_KEY = ${process.env.CONSUMER_KEY}\n,
CONSUMER_SECRET = ${process.env.CONSUMER_SECRET}\n,
ACCESS_TOKEN = ${process.env.ACCESS_TOKEN}\n,
ACCESS_TOKEN_SECRET = ${process.env.ACCESS_TOKEN_SECRET}\n
`)
