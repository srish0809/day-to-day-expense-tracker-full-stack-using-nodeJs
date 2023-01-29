require('dotenv').config();
const uuid= require('uuid');
const bcrypt= require('bcrypt');
const User = require('../model/user')
const Forgotpassword= require('../model/forgetpassword');



exports.forgotpassword = async (req,res) => {

try{
console.log(req.body.email);
email=req.body.email;
console.log(email);

const user = await User.findOne({where:{email} })
if(user)
{
    const id=uuid.v4();
    user.createForgotpassword({id, active:true})
    .catch(err =>{
        throw new Error(err)
    })
    const msg = {
        to: email, // Change to your recipient
        from: 'srashtisoni.2001.ss@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
    }
        console.log(msg)
        return res.status(201).json({message: 'Link to reset password sent to your mail ', sucess: true,link :`http://localhost:3000/password/resetpassword/${id}`})
        
}
else {
    throw new Error('User doesnt exist')
}
}

catch(error)
{
console.log(error);
return res.json({ message: error, sucess: false });
}

}

exports.resetpassword = async (req, res) => {
    console.log('hii')
    const id =  req.params.id;
    console.log(id);
    Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
       if (forgotpasswordrequest) {
            forgotpasswordrequest.update({ isActive: false });
            res.status(200).send(`<html>
                                  <center>  <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label><br>
                                        <input name="newpassword" type="password"></input>
                                        <button>Reset Password</button>
                                    </form></center>
                                </html>`
            );
            res.end();
        

        }
    }).catch((err)=>{
        console.error(err)
        return res.json({ message: err, sucess: false });
})
}

exports.updatepassword = async(req, res) => {

    try {
console.log(req.query.newpassword);
        const  newpassword  = req.query.newpassword;
        console.log(".............."+newpassword);
        
        const { resetpasswordid } = req.params;
        console.log(resetpasswordid)
        Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password

                    const saltRounds = 10;

                         bcrypt.hash(newpassword, saltRounds, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                           
                            user.update({ password: hash }).then(() => {
                               res.redirect('http://localhost:3000/FRONTEND/login/login.html')
                         //  return  window.location.href = 'http://127.0.0.1:5500/views/login.html'
                                 return res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    }
             else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }

}
