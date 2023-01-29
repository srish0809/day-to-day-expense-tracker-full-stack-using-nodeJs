async function SignUp(event){
    try{
    event.preventDefault();

    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let password=document.getElementById('password').value;

    const signupDetails={
        name,
        email,
        password
    }
    console.log(signupDetails);

    const response=await axios.post('http://localhost:3000/signup',signupDetails)
    if(response.status===201){
       alert("SignUp successful")
       window.location ='../login/login.html';
    }
    else
    {
        throw new Error('Failed to SignUp')
        
    }

}
catch(error){
    document.body.innerHTML+= `<div style="color:red;">${error}</div>`;
    alert("failed signup")
}
}
