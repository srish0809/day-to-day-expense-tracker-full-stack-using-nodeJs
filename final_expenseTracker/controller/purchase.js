const Razorpay=require('razorpay');
const Order=require('../model/order');
const usercontroller=require('./user');

const purchasePremium=async(req,res)=>{
    try{
   var rzp=new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
   })
   const amount = 9900;
   rzp.orders.create({amount,currency:"INR"} ,(err,order)=>{
    if(err){
        throw new Error(err);
    }
    req.user.createOrder({orderid:order.id, status: 'PENDING'}).then(()=>{
        return res.status(201).json({order , key_id : rzp.key_id});
    })
.catch(err =>{
   res.status(403).json({err})
})
})
    }
catch(error){
    console.log(error);
    res.status(403).json({message:"Something went wrong"});
}
}

const updatetransactionstatus= async (req,res)=>{
    try{
        const {payment_id,order_id} = req.body;;
        console.log("order id ",order_id)
        console.log("payment id ",payment_id)
        const order= await Order.findOne({where:{orderid:order_id}})
        const promise1  = await order.update({paymentid:payment_id,status:'SUCCESSFUL'});
        const promise2  = await req.user.update({ ispremiumuser:true})
                   
        Promise.all([promise1,promise2]).then(()=>{
            console.log("updated");
            return res.status(202).json({success:true ,message:'Transaction Successful'});  
        }).catch(err=>{
                  res.status(403).json(err);
                            })
       
    }
    
    
    catch(err){
        console.log(err);
        res.status(403).json({message:'Something went wrong',error:err})
    
    
    }
    }

module.exports={purchasePremium, updatetransactionstatus};