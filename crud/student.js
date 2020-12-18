const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const schema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: Number,
  hobbies: String
});
const Student = mongoose.model('Student', schema);

module.exports = Student