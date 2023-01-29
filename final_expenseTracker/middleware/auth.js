const User = require("../model/user");

const jwt = require('jsonwebtoken');

exports.authenticate = async (req,res,next)=>{
try{
    
    const token = req.header('Authorization');
    console.log(token);
    const user = jwt.verify(token,'secretkey');
    console.log("userid >>>>>>>>", user.userId);
    await User.findByPk(user.userId)
    .then(user=>{
        req.user=user;
       // console.log(req.user);
        next();

    }).
    catch(err=>{throw new Error(err)})
}

catch(err){
    console.log(err);
    return res.status(401).json({success:false})
}
}