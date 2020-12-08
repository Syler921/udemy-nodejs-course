const path = require('path');

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

//const mongoConnect = require('./util/database').mongoConnect;
const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  console.log('get user !!')
  User.findById('5fcd1edd20b94d3824e8d938')
    .then(user => {
      console.log('fount user !!')
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://syler:159753258@cluster0.okpks.mongodb.net/shop?retryWrites=true&w=majority')
.then((result)=>{
  User.findOne().then(user=> { 
    if(!user){
      const user = new User({
        name:'Syler',
        email:'test@abv.bg',
        cart:{
          items:[]
        }
      })
      user.save();
    }
  })
  
  app.listen(3000);
})
.catch(err=>{
  console.log(err)
})
