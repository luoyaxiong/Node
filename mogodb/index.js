const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27016/itcast', {useNewUrlParser: true, useUnifiedTopology: true});

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'miao'+index });
kitty.save().then(() => console.log('meow'));

