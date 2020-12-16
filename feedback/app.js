// 晚上写案例照着下面的步骤写：
// 1. / index.html
// 2. 开放 public 目录中的静态资源
//    当请求 /public/xxx 的时候，读取响应 public 目录中的具体资源
// 3. /post post.html
// 4. /pinglun
//    4.1 接收表单提交数据
//    4.2 存储表单提交的数据
//    4.3 让表单重定向到 /
//        statusCode
//        setHeader
const http = require('http')
const url = require('url')
const template = require('art-template')
const fs = require('fs')
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

http
  .createServer((req, res) => {
    const parseObj = url.parse(req.url, true)
    const pathname = parseObj.pathname
    if (pathname === '/') {
      fs.readFile('./views/index.html', (err, data) => {
        if (err) {
          console.log('index.html error');
        }
        const templateData = template.render(data.toString(), {
          comments
        })
        res.end(templateData)
      })
    } else if (pathname === '/favicon.ico') {
      fs.readFile('.' + pathname, (err, data) => {
        if (err) {
          console.log('favicon.ico error');
        }
        res.end(data)
      })
    } else if (pathname.indexOf('/public') === 0) {
      fs.readFile('.' + pathname, (err, data) => {
        if (err) {
          console.log('public error');
        }
        res.end(data)
      })
    } else if (pathname === '/post') {
      fs.readFile('./views/post.html', (err, data) => {
        if (err) {
          console.log('post error');
        }
        res.end(data)
      })
    } else if (pathname === '/review') {
      const comment = parseObj.query
      comment.dateTime = new Date()
      comments.unshift(comment)
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    } else {
      fs.readFile('./views/404.html', (err, data) => {
        if (err) {
          console.log('404 error');
        }
        res.end(data)
      })
    }

  })
  .listen(5000, () => {
    console.log('Server running, go to http://127.0.0.1:5000')
  })