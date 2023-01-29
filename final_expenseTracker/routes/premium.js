const express=require('express');
const router=express.Router();
const Authenticate=require('../middleware/auth')
const premiumController=require('../controller/premium');

router.get('/premiumembership/showLeaderboard',Authenticate.authenticate,premiumController.getUserLeaderBoard);
router.get('/premiumembership/download',Authenticate.authenticate,premiumController.download);

module.exports=router;