async function login(event){
    try{
    event.preventDefault();

    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;

    const loginDetails={
        email,
        password
    }
    console.log(loginDetails);

    const response=await axios.post('http://localhost:3000/login',loginDetails)
    if(response.status===200){
       alert(response.data.message)
       localStorage.setItem('token',response.data.token)
      window.location ='../EXPENSE/expense.html';
    }
    if(response.status===404){

        document.body.innerHTML+= `<div style="color:red;">${response.data.message}</div>`;

    }

}
catch(error){
    console.log(JSON.stringify(error));
    alert("Password Incorrect")
    document.body.innerHTML+= `<div style="color:red;">${error.message}</div>`;
}
}
