const downloadController = require('../controller/download')
const Authenticate = require('../middleware/auth')

const express = require('express');
const router = express.Router();
router.get('/premiumembership/download',Authenticate.authenticate,downloadController.downloadget);

module.exports=router;