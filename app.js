const express =require('express');
const bodyParser=require('body-parser');
const feedRoute=require('./routes/feed');
const sequelize = require('./utill/database');
const app=express();

app.use(bodyParser.json());

app.use('/',feedRoute);

sequelize
  .sync()
  .then(result => {
    // console.log(result);
    app.listen(3000,console.log('server run'));
  })
  .catch(err => {
    console.log(err);
  });