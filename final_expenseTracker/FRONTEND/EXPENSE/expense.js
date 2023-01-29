let form = document.getElementById('form');
let itemList = document.getElementById('users');
let flag = false;
let page=1;
let Pagination=document.getElementById('btn-group');

function showPremiumuserMessage() {
    document.getElementById('rzp-button1').style.visibility = "hidden";
    document.getElementById('premium').innerHTML = "You are a premium user ";
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


function getExpense(){
    const token = localStorage.getItem('token');
    let params = new URLSearchParams(window.location.search);
    page = params.get('page');

    if(page == null){
        page = 1;
    }
    console.log('page ' + page);

    axios.get(`http://localhost:3000/expense/add-user?page=${page}`,{headers:{"Authorization":token}})
    .then(({data:{expense, ...pagedata}}) => {
       console.log(expense);
       console.log(pagedata);
    //   for(var i = 1;i<=pagedata.count;i++){
    //     Pagination.innerHTML += `<a id='btn${total}' href='http://65.0.31.30:3000/expense/add-user?page=${total}'>${total}</a>`
      
    // }
        listProducts(expense);
       showPagination(pagedata);
        
    })
    .catch((err) => {
        console.log(err);
    }) 
}


window.addEventListener('DOMContentLoaded', () => {
    const token=localStorage.getItem('token')
    const decodedToken=parseJwt(token)
   // console.log(decodedToken)

    getExpense();

    const ispremiumuser=decodedToken.ispremiumuser;
     if(ispremiumuser)
    {
        showPremiumuserMessage();
       ShowLeaderboard();
    }
    // console.log(token);
    // axios.get("http://localhost:3000/expense/get-user",{headers:{"Authorization":token}})
    //     .then((response) => {
    //      console.log(response);
    //         response.data.allUsers.forEach((ele) => {
                
    //             showNewUseronScreen(ele);
               
    //         })
    //     })
        // .catch((err) => {
        //     console.log(err);
        // })
})


function listProducts(expense)
{
  // Pagination.innerText = '';
   console.log(expense);
    for(var i = 0;i<expense.length;i++){
        showNewUseronScreen(expense[i]);
    }
  
}


function showPagination({
   currentPage,nextPage,hasnextPage,previousPage,haspreviousPage,lastPage
 }){
     
    Pagination.innerText = ' ';
    console.log(currentPage,nextPage)
     if(haspreviousPage){
        
         const btn2 = document.createElement('button')
         btn2.style = style="background-color: rgb(105, 9, 105); color:white;"
         btn2.innerHTML=`<a  href='?page=${previousPage}'>${previousPage}</a>` 
       btn2.innerHTML = `<h3>${previousPage}</h3>`;
         btn2.addEventListener('click',()=>{
             listProducts(previousPage) 
             page = previousPage
             getExpense();
     })
     Pagination.appendChild(btn2);
     }
     
     const btn1 = document.createElement('button')
     btn1.style = style="background-color: rgb(105, 9, 105); color:white;"
     btn1.innerHTML +=`<a  href='?page=${currentPage}'>${currentPage}</a> ` 
     btn1.addEventListener('click',()=>{
         listProducts(currentPage)
         page = currentPage
         getExpense();
 
     })
     Pagination.appendChild(btn1);
     
     if(hasnextPage){
         const btn3 = document.createElement('button')
         btn3.style = style="background-color: rgb(105, 9, 105); color:white;"
 
         btn3.innerHTML =`<a  href='?page=${nextPage}'>${nextPage}</a> ` 
         btn3.addEventListener('click',()=>{
             listProducts(nextPage) 
             page = nextPage
             getExpense();
 
     })
     Pagination.appendChild(btn3);
     }
 
 
 }
 


form.addEventListener('submit', addItem);
function addItem(e) {
    e.preventDefault();
    let id = document.getElementById('id').value;
    let amount = document.getElementById('amount').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;

    let obj = {
        id,
        amount,
        description,
        category
    };
    console.log(obj);
    postRequest = async () => {
        try {
            const token=localStorage.getItem('token');
            if(flag==false){
           
            const response = await axios.post("http://localhost:3000/expense/add-user", obj,{headers:{"Authorization":token}});
            console.log(response);
            console.log(response.data.newExpenseDetail);
            location.reload();
            //showNewUseronScreen(response.data.newExpenseDetail);
            return;
            }
            else
            {
                console.log(obj.id);
                const response = await axios.post(`http://localhost:3000/expense/edit-user/${obj.id}`, obj,{headers:{"Authorization":token}});
                console.log(response.data);
                flag = false;
                location.reload();
            }
        } catch (err) {
            document.body.innerHTML += "<h4>Something went wrong !</h4>";
            console.log(err);
        }
    }
    postRequest();
}


deleteUserfrombackend = async (id) => {
    const token=localStorage.getItem('token')
    try {
        const users = await axios.delete(`http://localhost:3000/expense/delete-user/${id}`,{headers:{"Authorization":token}});
        deleteUserFromScreen(id);
        console.log(users);
    } catch (err) {
        document.body.innerHTML += "<h4>Something went wrong !</h4>";
        console.log(err);
    }
}


function showNewUseronScreen(userDetails){
    const d=document.getElementById('users')
    console.log(userDetails.id);
    let li= `<li id="${userDetails.id}"> '${userDetails.amount}','${userDetails.description}','${userDetails.category}'
     <button onclick = editUser('${ userDetails.id}','${ userDetails.amount}','${userDetails.description}','${userDetails.category}')> Edit </button> 
     <button onclick = deleteUserfrombackend('${userDetails.id}')> Delete </button> 
      </li>`
   d.innerHTML=d.innerHTML + li
   }


   function deleteUserFromScreen(id) {
    let child = document.getElementById(id)
    let parent=document.getElementById('users')
   
    if(child){
        parent.removeChild(child)
    }
    
}

function editUser(id,amount,description,category) {
    flag = true;
    document.getElementById('id').value=id;
    document.getElementById('amount').value=amount;
document.getElementById('category').value=category;
document.getElementById('description').value=description;

    }


BuyPremium=async function(e){
    const token=localStorage.getItem('token')
   // console.log(token);
    const response=await axios.get('http://localhost:3000/purchase/premiumembership', {headers : {"Authorization":token} } )
    console.log(response);
    
    var options ={
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function (response){
       const res= await axios.post("http://localhost:3000/purchase/updatetransactionstatus", {
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id,
            },{headers:{"Authorization":token}});
          //  console.log(res);
            alert("You are a Premium User Now");
              document.getElementById('rzp-button1').style.visibility = 'hidden';
              document.getElementById('premium').innerHTML += "<h4>You are premium user now!!</h4>";
              localStorage.setItem('token',res.data.token)
              //localStorage.setItem('ispremiumuser',true);
             
        },

    };


const rzp1 = new Razorpay(options);
rzp1.open();
rzp1.on('payment.failed',function(response){
console.log(response)
alert("Something went wrong!");
});
}


function ShowLeaderboard(){
    const LB=document.createElement('input');
    LB.id="lb";
    LB.type="button";
    LB.value="Show LeaderBoard";
    LB.onclick= async() => {
        document.getElementById('lb').style.visibility = 'hidden';
        var LBE=document.getElementById('leaderboard')
        LBE.innerHTML+= '<h1>LEADER BOARD</h1>'

        document.getElementById('download').innerHTML='<button onclick="download()">DOWNLOAD</button>'
       

        const token = localStorage.getItem('token')
        const userLeaderBoardArray = await axios.get('http://localhost:3000/premiumembership/showLeaderboard', { headers: {"Authorization" : token} })
        .then(response =>{
            const data=response.data;
            console.log(data);

            

            for(let i=0;i<data.length;i++)
            {
                LBE.innerHTML += `<li>Name - ${data[i].name} Total Expense - ${data[i].TotalCost || 0} </li>`
                console.log(`<li>Name - ${data[i].name} Total Expense - ${data[i].TotalCost || 0} </li>`);
                
            }                   
           })
           
        .catch(error => {
            console.log(error);
        })      
    }
    
   

    document.getElementById("premium").appendChild(LB);
}

function download(){
    const token = localStorage.getItem('token')
   axios.get('http://localhost:3000/premiumembership/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 201){
            //the backend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileUrl;
            a.download = 'myexpense.txt';
            a.click();
            alert('Your file is been downloaded')
            console.log(response);
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
       console.log(err);
    });
}

