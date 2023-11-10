let chat = document.getElementById("chat");
//chat.addEventListener("submit", saveToLocal);

let userlist = document.getElementById("userlist");

let msglist = document.getElementById("msglist");
let message = document.getElementById("message");
let sendbtn = document.getElementById("send");

setTimeout(async()=>{ 
     await local();
    
}, 1000);
document.addEventListener('DOMContentLoaded',displayUsers)
async function displayUsers(){
    try{
        //let token=localStorage.getItem('token')
        let res=await axios.get('http://localhost:3000/chat/users');
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
async function local(){
    let res = await axios.get('http://localhost:3000/chat/msg');
    //console.log("local",res.data)
    localStorage.setItem('data',JSON.stringify(res.data));

}
async function displaymsg(){
    try{
        
      //let res = await axios.get('http://localhost:3000/chat/msg');
      if(localStorage.getItem('data')){
        let res = localStorage.getItem('data');
        res = JSON.parse(res);
         console.log("msg",res)
          msglist.innerHTML=''
              for(let i=0;i<res.length;i++){
                  msglist.innerHTML+=`<li class="list-group-item" >${res[i].user.name} : ${res[i].msg}</li>`
          }
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
async function send(){
    try{
        let token=localStorage.getItem('token')
        let data = message.value;
        //console.log(data);
        
       
        if(message!==''){
            await axios.post(`http://localhost:3000/chat/send`,{data},{headers:{Authorization:token}})
        }
        let res=await axios.get('http://localhost:3000/chat/lastmsg');
        console.log("new msg res",res)
        let old = JSON.parse(localStorage.getItem('data'))
       console.log("old",old)
        let comb = [...old,res.data];
        if(comb.length > 10){
            comb.shift();
            
        }
        localStorage.setItem('data',JSON.stringify(comb))
        console.log("combined",comb);
        //msglist.innerHTML+=`<li class="list-group-item" >${res.data.user.name} : ${res.data.msg}</li>`
         displaymsg()
     
    }
    catch(error){
        console.log(error)
    }
}