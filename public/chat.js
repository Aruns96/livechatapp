let chat = document.getElementById("chat");
//chat.addEventListener("submit", saveToLocal);

let userlist = document.getElementById("userlist");

let msglist = document.getElementById("msglist");
let message = document.getElementById("message");
let sendbtn = document.getElementById("send");


document.addEventListener('DOMContentLoaded',displayUsers)
async function displayUsers(){
    try{
        let token=localStorage.getItem('token')
        let res=await axios.get('http://localhost:3000/chat/users',{headers:{Authorization:token}});
        //console.log("users",res);
        userlist.innerHTML=''
        for(let i=0;i<res.data.users.length;i++){
            userlist.innerHTML+=`<li class="list-group-item"  id="${res.data.users[i].id}" >${res.data.users[i].name} joined</li>`
        }
        
            displaymsg()
       
       
    }
    catch(err){
        console.log(err)
    }
    
}

async function displaymsg(){
    try{
        
      let res = await axios.get('http://localhost:3000/chat/msg');
       console.log("msg",res)
        msglist.innerHTML=''
            for(let i=0;i<res.data.msg.length;i++){
                msglist.innerHTML+=`<li class="list-group-item" >${res.data.msg[i].user.name} : ${res.data.msg[i].msg}</li>`
        }
        
      
    }
    catch(error){
        console.log(error)
    }
}
sendbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    
    message.value==''?console.log('No Message'):send(message.value);
    message.value = " "
})
async function send(msg){
    try{
        let token=localStorage.getItem('token')
        let data = message.value;
        //console.log(data);
        
       
        if(message!==''){
            await axios.post(`http://localhost:3000/chat/send`,{data},{headers:{Authorization:token}})
        }
        setTimeout(()=>{
            displaymsg()
        },1000);
    }
    catch(error){
        console.log(error)
    }
}