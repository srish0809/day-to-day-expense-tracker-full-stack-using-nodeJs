const express=require('express');
const router=express.Router();
const Authenticate=require('../middleware/auth')
const purchaseController=require('../controller/purchase');

router.get('/purchase/premiumembership',Authenticate.authenticate,purchaseController.purchasePremium);
router.post('/purchase/updatetransactionstatus',Authenticate.authenticate,purchaseController.updatetransactionstatus);

module.exports=router;