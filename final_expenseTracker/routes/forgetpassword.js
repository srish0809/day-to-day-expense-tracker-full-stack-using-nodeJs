const express = require('express');
const router = express.Router();

const Authenticate=require('../middleware/auth')

//const rootdir = require('../util/path');
const forgetpasswordController = require('../controller/forgetpassword');

router.post('/password/forgot-password',Authenticate.authenticate,forgetpasswordController.forgotpassword);
router.get('/password/updatepassword/:resetpasswordid', forgetpasswordController.updatepassword)
router.get('/password/resetpassword/:id', forgetpasswordController.resetpassword)


module.exports=router;