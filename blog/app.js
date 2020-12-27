const express = require('express')
const path = require('path')
const router = require('./router')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const port = 4000

app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

// view engine setup
app.engine('html', require('express-art-template'));
// app.set('view', {
//     debug: process.env.NODE_ENV !== 'production'
// });
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'art');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(router)

app.listen(port, () => {
  console.log(`server is running on http://127.0.0.1:${port}`);
})