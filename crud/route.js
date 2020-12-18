const express = require('express')
const stu = require('./student')
const fs = require('fs')


const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  res.redirect('/students')
})

router.get('/students', (req, res) => {
  stu.retrive((err, students) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.render('index.html', {
      'students': students
    })
  })
})

router.get('/students/new', (req, res) => {
  res.render('new.html')
})

router.post('/students/new', (req, res) => {
  const student = req.body
  stu.create(student, (err) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.redirect('/students')
  })
})

router.get('/students/edit', (req, res) => {
  stu.findById(req.query.id,(err,idStudent) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.render('edit.html', {'student':idStudent})
  })
})

router.post('/students/edit', (req, res) => {
  // 1. 接受post的内容
  const student = req.body
  console.log(student);
  // 2. 更新data.json
  stu.update(student,(err) => {
    if (err) {
      res.status(500).send('server error')
    }
    // 3. redirect
    res.redirect('/students')
  })
  
})

router.get('/students/delete', (req, res) => {
  const id = req.query.id
  stu.dalete(id,(err) => {
    if (err) {
      res.status(500).send('server error')
    }
    // 3. redirect
    res.redirect('/students')
  })
})