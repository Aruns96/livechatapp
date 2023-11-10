let chat = document.getElementById("chat");
chat.addEventListener("submit", saveToLocal);

let userlist = document.getElementById("userlist");

let msglist = document.getElementById("msglist");
let msg = document.getElementById("msg");
let sendbtn = document.getElementById("send");


window.addEventListener('DOMContentLoaded',displayUsers)
async function displayUsers(){
    try{
        
        let res=await axios.get('http://localhost:3000/chat/users')
        userlist.innerHTML=''
        for(let i=0;i<res.data.length;i++){
            userlist.innerHTML+=`<li id="${res.data[i].id}" >${res.data[i].name} joined</li>`
        }
        displaymsg(res)
    }
    catch(err){
        console.log(err)
    }
    
}
async function displaymsg(res){
    try{
       
        msglist.innerHTML=''
            for(let i=0;i<res.length;i++){
                msglist.innerHTML+=`<li >${res[i].user.name} : ${res[i].msg}</li>`
        }
        
      
    }
    catch(error){
        console.log(error)
    }
}
sendbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    
    msg.value==''?console.log('No Message'):send(msg.value)
})
async function send(msg){
    try{
        
        input.value=' '
        
       
        if(msg!==''){
            await axios.post(`http://localhost:3000/chat/send/`,{data})
        }
        
    }
    catch(error){
        console.log(error)
    }
}