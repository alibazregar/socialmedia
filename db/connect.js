const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function(url){
    mongoose.connect(url,
      {useNewUrlParser: true,
      useUnifiedTopology: true,})
      .then(()=>console.log('Connected to database'))
      .catch(err=>console.log(`error to connect to db`+ err))
}