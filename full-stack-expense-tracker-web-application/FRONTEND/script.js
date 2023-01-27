let form = document.getElementById('form');
let itemList = document.getElementById('users');
let flag = false;

window.addEventListener('DOMContentLoaded', () => {
    axios.get("http://localhost:3000/get-user")
        .then((response) => {
           
            response.data.allUsers.forEach((ele) => {
                showNewUseronScreen(ele);
               
            })
        })
        .catch((err) => {
            console.log(err);
        })
})

// form.addEventListener('submit', addItem);
function addItem(e) {
    e.preventDefault();
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let obj = {
        id,
        name,
        email,
        password
    };
    postRequest = async () => {
        try {

            if(flag==false){
           
            const response = await axios.post("http://localhost:3000/add-user", obj);
            console.log(response);
            console.log(response.data.newExpenseDetail);
           
            location.reload();
            
            //showNewUseronScreen(response.data.newExpenseDetail);
            return;
            }
            else
            {
                console.log(obj.id);
                const response = await axios.post(`http://localhost:3000/edit-user/${obj.id}`, obj);
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
    try {
        const users = await axios.delete(`http://localhost:3000/delete-user/${id}`);
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
    let li= `<li id="${userDetails.id}"> '${userDetails.name}','${userDetails.email}','${userDetails.password}'
     <button onclick = editUser('${ userDetails.id}','${ userDetails.name}','${userDetails.email}','${userDetails.password}')> Edit </button> 
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

function editUser(id,name,email,password) {
    flag = true;
    document.getElementById('id').value=id;
    document.getElementById('name').value=name;
document.getElementById('email').value=email;
document.getElementById('password').value=password;

    }