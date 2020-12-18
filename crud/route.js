const express = require('express')
const stu = require('./student')
const fs = require('fs')
const { log } = require('console')


const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
  res.redirect('/students')
})

// retrive
router.get('/students', (req, res) => {
  stu.find((err, students) => {
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

// creat
router.post('/students/new', (req, res) => {
  const student = req.body
  stu.create(student, (err) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.redirect('/students')
  })
})

// findById
router.get('/students/edit', (req, res) => {
  stu.findById(req.query.id,(err,student) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.render('edit.html', {'student':student})
  })
})

// 
router.post('/students/edit', (req, res) => {
  // 1. 接受post的内容
  const student = req.body
  student.id = student.id.replace(/"/gi,"")
  // 2. 更新data.json
  stu.updateOne({_id:req.body.id},student,(err,doc) => {
    if (err) {
      res.status(500).send('server error')
    }
    console.log('doc: ',doc);
    // 3. redirect
    res.redirect('/students')
  })
  
})

// delete
router.get('/students/delete', (req, res) => {
  const student_id = req.query.id
  stu.deleteOne({_id: student_id },(err, doc) => {
    if (err) {
      res.status(500).send('server error')
    }
    res.redirect('/students')
  })
})