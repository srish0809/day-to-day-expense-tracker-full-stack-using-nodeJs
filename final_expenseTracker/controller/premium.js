const User=require('../model/user')
const Expense=require('../model/expense')
const sequelize=require('../util/database')
const Download=require('../model/download')
const AWS=require('aws-sdk')

exports.getUserLeaderBoard= async(req,res) => {
    try{
          
        const userLeaderBoardDetails= await User.findAll({
            attributes: ['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'TotalCost']],
            include: [
                {
                    model:Expense,
                    attributes:[]
                }
            ],
            group: ['user.id']
            //order:[[sequelize.col('TotalCost'),'DESC']]
         });
       // console.log(userLeaderBoardDetails);
         res.status(200).json(userLeaderBoardDetails);
        }

     

    catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
}

function uploadtoS3(data,filename){
    
    let s3bucket = new AWS.S3({
        accessKeyId : process.env.Access_key_ID,
        secretAccessKey : process.env.Secret_access_key
    })

    var params = {
        Bucket : 'expensetrackersrashti',
        Key : filename,
        Body : data,
        ACL : 'public-read'
    }

    return new Promise((resolve,reject)=>{
      s3bucket.upload(params,(err,s3response)=>{
        if(err){
            console.log("Something went wrong",err)
            reject(err);
        }
        else
        {
            resolve(s3response.Location)
        }
      })
    })
}



exports.download = async (req,res)=>{
try{
    console.log(req.user);
      const expenses = await req.user.getExpenses();
   

    console.log("------------------------------------------------------------------------------");
   
    console.log(expenses);
    const stringifyExpenses = JSON.stringify(expenses);
    console.log(stringifyExpenses); 

    const userId = req.user.id;

    const filename = `Expenses${userId}/${new Date()}.txt`;
    const fileURL = await uploadtoS3(stringifyExpenses,filename);
    console.log(fileURL);
    let date = new Date();
    console.log(date);
    res.status(201).json({fileURL:fileURL,success:true});

    Download.create({
        userId:req.user.id,
        DateTime : date,
        fileUrl : fileURL
    })


}
catch(err){
    console.log(err);
    res.status(500).json({fileURL:'',success:false,err:err});
}
}