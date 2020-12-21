const express = require('express')
const User = require('./models/user')

const md5 = require('md5');

let router = express.Router()


router.get('/', (req, res) => {
  res.render('index.html'), {
    user: req.session.user
  }
})

router.get('/register', (req, res) => {
  res.render('register.html')
})

router.post('/register', (req, res) => {
  const body = req.body
  body.password = md5(md5(body.password))
  User.findOne({
    $or: [{
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  }, (err, doc) => {
    if (err) {
      return res.status(500).json({
        err_code: 500,
        msg: 'server error'
      })
    }
    if (doc) {
      return res.status(200).json({
        err_code: 1,
        msg: 'email or nickname exists'
      })
    }

    User.create(body, (err, user) => {
      if (err) {
        return res.status(500).json({
          err_code: 500,
          msg: 'server error'
        })
      }
      req.session.user = user
      res.status(200).json({
        err_code: 0,
        msg: 'created'
      })

    })
  })

})

// promise

// // async and awit
// router.post('/register', async (req, res) => {
//   const body = req.body

//   try {

//     if (await User.findOne({
//         "email": body.email
//       })) {
//       return res.status(200).json({
//         err_code: 1,
//         msg: 'Email exists'
//       })
//     }

//     if (await User.findOne({
//         "nickname": body.nickname
//       })) {
//       return res.status(200).json({
//         err_code: 2,
//         msg: 'Nickname exists'
//       })
//     }

//     //MD5 加密两次
//     body.password = md5(md5(body.password))
//     await User.create(body)

//     res.status(200).json({
//       err_code: 0,
//       msg: 'created'
//     })


//   } catch (error) {
//     res.status(500).json({
//       err_code: 500,
//       msg: error.message
//     })
//   }

// })

router.get('/login', (req, res) => {
  res.render('login.html')
})

router.post('/login', (req, res) => {})

router.get('/logout', (req, res) => {
  res.render('login.html')
})


module.exports = router