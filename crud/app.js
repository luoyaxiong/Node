const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const router = require('./route.js')
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

// view engine setup
app.engine('html', require('express-art-template'));
const port = 5000

app.use('/node_modules', express.static('./node_modules'))
app.use('/public', express.static('./public'))

app.use(router)

app.listen(port, () => {
  console.log(`server http://127.0.0.1:${port} is running`)
})