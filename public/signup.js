let form = document.getElementById("signUp");
form.addEventListener("submit", saveToLocal);


 function saveToLocal(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const password = event.target.password.value;
   

   const obj = {
    name,
    email,
    phone,
    password
   }
   
    
    axios.post("http://localhost:3000/user/sign-up" ,obj)
    .then(res =>{
        
        console.log(res);
        

    })
    .catch(e => {
        console.log(e)

        document.body.innerHTML=document.body.innerHTML + "<h3>Error</h3>"
    })
    event.target.name.value="";
    event.target.email.value="";
    event.target.phone.value="";
    event.target.password.value="";


   }