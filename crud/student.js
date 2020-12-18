const fs = require('fs')

const dbPath = './data.json'

// create
exports.create = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }

    const students = JSON.parse(data).students
    let MAX_ID = -999
    students.forEach(e => {
      const e_id = parseInt(e.id)
      if (e_id > MAX_ID) {
        MAX_ID = e_id
      }
    });
    student.id = String(MAX_ID + 1)
    students.push(student)

    const fileSavedData = JSON.stringify({
      students
    })
    fs.writeFile(dbPath, fileSavedData, (err) => {
      if (err) {
        return callback(err)
      }
      callback()
    })
  })
}

// retrive
exports.retrive = (callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

// findById
exports.findById = (id, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    const students = JSON.parse(data).students
    const ret = students.find((e) => {
      return e.id === id
    })
    callback(null, ret)
  })
}

// update
exports.update = (student, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }

    const students = JSON.parse(data).students
    // 找出idItem
    const idItem = students.find((e) => {
      return e.id === student.id
    })
    // 替换
    for (let key in idItem) {
      idItem[key] = student[key]
    }

    const fileSavedData = JSON.stringify({
      'students': students
    })
    fs.writeFile(dbPath, fileSavedData, (err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

// delete
exports.dalete = (id, callback) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    const students = JSON.parse(data).students
    const deletedId = students.findIndex((e) => {
      return e.id === id
    })

    students.splice(deletedId, 1)

    const fileSavedData = JSON.stringify({
      'students': students
    })
    fs.writeFile(dbPath, fileSavedData, (err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })

  })
}