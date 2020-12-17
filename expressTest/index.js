const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const comments = [{
    name: '张三',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三2',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三3',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三4',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  },
  {
    name: '张三5',
    message: '今天天气不错！',
    dateTime: '2015-10-16'
  }
]

// view engine setup 默认w文件夹 ./views
app.engine('html', require('express-art-template'));
// app.set('views', {
//   debug: process.env.NODE_ENV !== 'production'
// });
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/public', express.static('./public'))

app.get('/', (req, res) => {
  res.render('index.html', {
    comments
  });
})

app.get('/post', (req, res) => {

  res.render('post.html')
  res.send()

})

app.post('/post', (req, res) => {
  const comment = req.body;
  comment.dateTime = new Date()
  comments.unshift(comment)
  res.redirect('/')

})

// app.get('/review', (req, res) => {
//   const comment = req.query
//   comment.dateTime = new Date()
//   comments.unshift(comment)
//   res.redirect('/')
//   // res.statusCode = 302
//   // res.setHeader('Location', '/')
//   res.send()
// })

app.listen(3000, () => {
  console.log('server running, go to http://127.0.0.1:3000');

})