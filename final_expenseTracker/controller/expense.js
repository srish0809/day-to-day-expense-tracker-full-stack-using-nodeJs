const path = require('path');
const Expense = require('../model/expense');

exports.AddDetails = async (req,res,next)=>{
    try {
      
      const amount = req.body.amount;
      const category = req.body.category;
      const description = req.body.description;
      
      //   if (!amount) {
    //       throw new Error('Amount is mandatory !')
    //   }
      const data = await Expense.create({
          amount : amount,
          category : category,
          description : description,
          userId:req.user.id
      })
  
      res.status(201).json({ newExpenseDetail: data });
      console.log(data)
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
  }
}

exports.getDetails=async (req,res,next)=>{
    try{
        let totalItems =  await Expense.count({where :{userId:req.user.id}});
        let items_per_page = 5;
        const page =  Number(req.query.page);
       
        Expense.findAll()
             .then((total)=>{
              
        return Expense.findAll({ offset:((page-1)*items_per_page),

            limit :items_per_page

        }).then((expense)=>{
            console.log(expense)
            res.status(200).json({expense:expense,
            currentPage:page,      
        hasnextPage:items_per_page*page<totalItems,
        nextPage:page+1,
        haspreviousPage:page>1,
        previousPage:page-1,
        lastPage:Math.ceil(totalItems/items_per_page)});
        })
    
    })
      
    
} 
    catch(err) {
        console.log(err);
        res.status(500).json({error : err})
    }
}

exports.deleteDetails = async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await Expense.findAll({where: {id:id, userId : req.user.id}});
        if(!user){
            console.log('This user does not exist.');
            return res.sendStatus(400);
        }
      const rows= await Expense.destroy({where: {id:id}});
       if(rows===0)
       {
        return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
       }
        res.sendStatus(200).json({success:true, message:"Deleted Successfully"});
        }
        catch(err){
            console.log(err);
            res.status(500).json({ success: true, message: "Failed"})
        }
}
exports.editDetails = async (req, res, next) => {
    try{
        
        const updatedamount = req.body.amount;
        const updateddescription = req.body.description;
        const updatedcategory = req.body.category;
        const id = req.params.id;
       
        console.log(id);
        let user = await Expense.update(
            {
                amount : updatedamount,
            category:updatedcategory,
            description:updateddescription
           
            },
                {where:{id:id,userId : req.user.id}})
                console.log(user);
                res.status(201).json({user}); 
    }catch(err){
        console.log(err);
        res.status(500).json({error : err})
    }
}