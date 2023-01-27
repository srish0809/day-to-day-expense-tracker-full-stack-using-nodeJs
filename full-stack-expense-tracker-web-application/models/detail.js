const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: 
    {
        type: Sequelize.STRING,
        allowNull: false

    },
    email: 
    {
        type: Sequelize.STRING,
        allowNull: false,
        distinct:true
    
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        distinct:true
    }
});
module.exports=Expense;