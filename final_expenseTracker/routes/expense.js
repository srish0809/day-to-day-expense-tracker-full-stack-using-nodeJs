const express = require('express');
const router = express.Router();

const Authenticate=require('../middleware/auth')

//const rootdir = require('../util/path');
const expenseController = require('../controller/expense');

router.post('/expense/add-user',Authenticate.authenticate, expenseController.AddDetails);
router.get('/expense/add-user',Authenticate.authenticate, expenseController.getDetails);
router.delete('/expense/delete-user/:id',Authenticate.authenticate, expenseController.deleteDetails);
router.post('/expense/edit-user/:id',Authenticate.authenticate,  expenseController.editDetails)

module.exports=router;
