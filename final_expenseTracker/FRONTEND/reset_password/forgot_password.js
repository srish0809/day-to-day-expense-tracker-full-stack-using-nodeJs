let token = localStorage.getItem('token')
async function resetpassword(e)
{ 
    e.preventDefault();
    try{
       let email=document.getElementById('email').value;
       console.log(email)
       const resetDetails={email};
       console.log(resetDetails);

       const response=await axios.post('http://localhost:3000/password/forgot-password',resetDetails, { headers: {"Authorization" : token} })
       if(response.status==201){
          console.log(response);
          alert('done')
       }
       else
       {
           throw new Error('Failed to Reset the Password')
       }
    }
    catch(error){
        console.log(error);
    }
}