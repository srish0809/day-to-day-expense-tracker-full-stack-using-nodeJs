require('dotenv').config();
const User=require('../model/user')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

function generateAccessToken(id,name,ispremiumuser){
   
   return jwt.sign({userId :id, name:name, ispremiumuser},'secretkey');
  
}

exports.signup=async(req,res)=>{
   try{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    

    if(!email){
       throw new Error('email is mandatory! ')
    }
   const saltrounds=10;
   bcrypt.hash (password , saltrounds , async (err,hash)=>{
     console.log(err);
     const data= await User.create({
        name:name,
        email:email,
        password:hash
   })
  // console.log(data);
   res.status(201).json({message:"Successfully New User Created!!"})
  })
   }
   catch(error){
       console.log(error);
      res.status(500).json({error:error})
   }
}




exports.login=async(req,res)=>{
  
      const {email,password} =req.body;
   //  const email=req.body.email;
   //  const password=req.body.password;

    if(!email){
       throw new Error('email is mandatory! ')

    }

   await User.findAll({where:{email:email}}).then((user)=>{
     
         if(user.length >0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
         
          if(err){
            throw new Error('Something went wrong!')
          }
         if(result===true){
           return res.status(200).json({message:'Successfully logged In ',token: generateAccessToken(user[0].id,user[0].name, user[0].ispremiumuser)}
         );
         }
         else{
          return res.status(404).json({message:'Password Incorrect'});
         }
      })
   }
 
    else {
     return res.status(405).json({message:'User doesnt exist, first Sign Up'});
   
   }
   })
    .catch((error)=>{
      res.status(404).json({error:error})  
    }) 
}