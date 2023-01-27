const path = require('path');
const Expense = require('../models/detail');

function isstringvalid(string){
if(string==undefined||string.length===0){
    return true;
}
else{
    return false;
}
}

exports.AddDetails = async (req,res,next)=>{
    try {
      
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      
  
      if (isstringvalid(name) || isstringvalid(email) || isstringvalid(password)) {
          return res.status(400).json({err:"Details missing!"});
      }
      const data = await Expense.create({
          name : name,
          email : email,
          password : password
      })
  
      res.status(201).json({ newExpenseDetail: data });
      console.log(data)
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}
exports.getDetails=async (req,res,next)=>{
    try{
        const Users = await Expense.findAll();
       
        res.status(200).json({allUsers : Users});
    }catch(err) {
        console.log(err);
        res.status(500).json({error : err})
    }
}
exports.deleteDetails = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await Expense.findAll({where: {id:id}});
        if(!user){
            console.log('This user does not exist.');
            return res.sendStatus(400);
        }
        await Expense.destroy({where: {id:id}});
        res.sendStatus(200);
        }catch(err){
            console.log(err);
            res.status(500).json({error : err})
        }
}
exports.editDetails = async (req, res, next) => {
    try{
        
        const updatedname = req.body.name;
        const updatedemail = req.body.email;
        const updatedpassword = req.body.password;
        const id = req.params.id;
        console.log(id);
        let user = await Expense.update(
            {
                name : updatedname,
            email:updatedemail,
           password:updatedpassword
            },
                {where:{id:id}})
                console.log(user);
                res.status(201).json({user}); 
    }catch(err){
        console.log(err);
        res.status(500).json({error : err})
    }
}