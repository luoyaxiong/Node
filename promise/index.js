const fs = require('fs')

const p1 = new Promise((resolve, reject) => {
  fs.readFile('./a.text', 'utf8', (err, res) => {
    if (err) {
      reject(err)
    }
    resolve(res);
  })
})

const p2 = new Promise((resolve, reject) => {
  fs.readFile('./b.text', 'utf8', (err, res) => {
    if (err) {
      reject(err)
    }
    resolve(res);
  })
})

const p3 = new Promise((resolve, reject) => {
  fs.readFile('./c.text', 'utf8', (err, res) => {
    if (err) {
      reject(err)
    }
    resolve(res);
  })
})

function promiseReadFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res);
    })
  })
}

promiseReadFile('./a.text')
  .then((data) => {
    console.log(data);
    return promiseReadFile('./b.text')
  })
  .then((data) => {
    console.log(data);
    return promiseReadFile('./c.text')
  })
  .then((data) => {
    console.log(data);
  })


// p1
//   .then(
//     (data) => {
//       console.log(data);
//       return p2
//     }
//   ).then(
//     (data) => {
//       console.log(data);
//       return p3
//     }
//   ).then(
//     (data) => {
//       console.log(data);
//     }
//   )