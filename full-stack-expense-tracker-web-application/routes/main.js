const express = require('express');
const router = express.Router();
const path = require('path');

//const rootdir = require('../util/path');
const productsController = require('../controllers/mainController');

router.post('/add-user',productsController.AddDetails);
router.get('/get-user',productsController.getDetails);
router.delete('/delete-user/:id',productsController.deleteDetails);
router.post('/edit-user/:id',productsController.editDetails)

module.exports=router;