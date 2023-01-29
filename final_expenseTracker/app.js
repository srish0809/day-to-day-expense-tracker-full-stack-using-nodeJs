const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv=require('dotenv');

const User = require('./model/user');
const Expense = require('./model/expense');
const sequelize=require('./util/database');
const Order=require('./model/order')
const Forgotpassword = require('./model/forgetpassword')
const Download=require('./model/download')
const app=express();

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json({extended:false}));
app.use(cors());

const loginRoutes = require('./routes/user')
const expenseRoute=require('./routes/expense')
const purchaseRoute=require('./routes/purchase')
const premiumRoute=require('./routes/premium')
const forgetPRoute=require('./routes/forgetpassword')
const downloadroute= require('./routes/download')

app.use(loginRoutes);
app.use(expenseRoute);
app.use(purchaseRoute);
app.use(premiumRoute);
app.use(forgetPRoute);
app.use(downloadroute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(Download);
Download.belongsTo(User);

sequelize.sync()
  .then((result)=>{
  app.listen(3000);
 })
 .catch((err) => {
  console.log(err)
    });