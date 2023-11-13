let chat = document.getElementById("chat");
//chat.addEventListener("submit", saveToLocal);

let userlist = document.getElementById("userlist");

let msglist = document.getElementById("msglist");
let message = document.getElementById("message");
let sendbtn = document.getElementById("send");
let grplist = document.getElementById("grplist");
let createGroup=document.getElementById('group');



let grpcheck=document.querySelector('.form-check')
let token=localStorage.getItem('token')
let groupid=localStorage.getItem('groupid')

// document.getElementById('grp-global').addEventListener('click',()=>{
//     console.log('hai')
//     localStorage.removeItem('data')
//     localStorage.setItem('groupid',0)
//     groupid=0
//     local(0);
// })

createGroup.addEventListener('click',create)
async function create(){
    try{
        console.log('hai')
        let token=localStorage.getItem('token')
        let promise=await axios.get('http://localhost:3000/chat/users',{headers:{Authorization:token}});
        console.log(promise);
        userlist.innerHTML=""
        let div=document.createElement('div')
        let btn=document.createElement('button')
        btn.className="btn btn-outline-info check-btn"
        btn.innerText="Add"
        div.className="form-check"
        div.innerHTML='<input id="grpname" class="form-control" placeholder="Enter Group Name">'
       
        userlist.appendChild(div)
        
        for(let i=0;i<promise.data.length;i++){
            let str=String(promise.data[i].name)
            div.innerHTML+=`<li class="list-group-item">
            <input id="${promise.data[i].email}" name="user-list" class="form-check-input" type="checkbox" id=${promise.data[i].name}">
            <label for="${promise.data[i].name}" class="form-check-label" > ${promise.data[i].name}</label></li>`
        }
        userlist.appendChild(btn);
        document.querySelector('.check-btn').addEventListener('click',checkclick)
    }
    catch(err){
        console.log(err)
    }
}
async function checkclick(){
    try{
        let checkbox=document.getElementsByName('user-list')
        let email=[]
        let name=document.getElementById('grpname').value||'GROUP'
        let token=localStorage.getItem('token')
        for(let i=0;i<checkbox.length;i++){
                if(checkbox[i].checked==true){
                    console.log(checkbox[i].id)
                    email.push(checkbox[i].id)
                }
        }
        let promise=await axios.post(`http://localhost:3000/group/create`,{email,name},{headers:{Authorization:token}})
        location.reload()
    }
    catch(error){
        console.log(error)
    }

}


document.addEventListener('DOMContentLoaded',grpdisplay)
async function grpdisplay(){
    try{
        let promise=await axios.get(`http://localhost:3000/group/show`,{headers:{Authorization:token}})
        for(let i=0;i<promise.data.length;i++){
            grplist.innerHTML+=`<button id=${promise.data[i].id} name='grp-list' class="list-group-item btn btn-outline-primary " >${promise.data[i].name}</button>`
        } 
        let groupList=grplist.children
        console.log(groupList)
        for(let i=0;i<groupList.length;i++){
            groupList[i].addEventListener('click',getGroupMsg)
        }
    }
    catch(error){
        console.log(error)
    }
}
async function getGroupMsg(e){
    try{
        console.log('hello')
        localStorage.removeItem('data')
        localStorage.setItem('groupid',e.target.id)
        groupid=e.target.id
        local(e.target.id)
    }
    catch(error){
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded',displayUsers)
async function displayUsers(){
    try{
        let token=localStorage.getItem('token')
        let res=await axios.get('http://localhost:3000/chat/users',{headers:{Authorization:token}});
        console.log("users",res);
        userlist.innerHTML=''
        for(let i=0;i<res.data.length;i++){
            userlist.innerHTML+=`<li class="list-group-item"  id="${res.data[i].id}" >${res.data[i].name} joined</li>`
        }
        
            displaymsg()
       
       
    }
    catch(err){
        console.log(err)
    }
    
}
// async function local(){
//     let res = await axios.get('http://localhost:3000/chat/msg');
//     //console.log("local",res.data)
//     localStorage.setItem('data',JSON.stringify(res.data));

// }

async function local(groupid){
    try{
        if(localStorage.getItem('data')==''){
            console.log('local',groupid)
            let local=localStorage.getItem('data')
            local=JSON.parse(local)
            let msgid=local[local.length-1].id
            let promise1=await axios.get(`http://localhost:3000/chat/lastmsg/?msgid=${msgid}&groupid=${groupid}`)
            let obj=[]
            obj.push(local)
            for(let i=0;i<promise1.data.length;i++){
                if(obj[0].length>=20){
                    obj[0].shift()
                    obj[0].push(promise1.data[i])
                }else{
                    obj[0].push(promise1.data[i])
                }
            }
            localStorage.setItem('data',JSON.stringify(obj[0]))
            console.log('global',groupid)
            displaymsg()
        }
        else{
            let promise=await axios.get(`http://localhost:3000/chat/msg/?groupid=${groupid}`) 
            localStorage.setItem('data',JSON.stringify(promise.data))
            displaymsg()
        }
    }
    catch(error){
        console.log(error)
    }


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
      }else{
        await local(0);
      }
     
        
      
    }
    catch(error){
        console.log(error)
    }
}
sendbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    
    message.value==''?console.log('No Message'):send(groupid,message.value);
    message.value = " "
})
async function send(groupid,msg){
    try{
        let token=localStorage.getItem('token')
        let data = {groupid,msg};
        //console.log(data);
        
       
        if(message!==''){
            await axios.post(`http://localhost:3000/chat/send`,{data},{headers:{Authorization:token}})
        }
    //     let res=await axios.get('http://localhost:3000/chat/lastmsg');
    //     console.log("new msg res",res)
    //     let old = JSON.parse(localStorage.getItem('data'))
    //    console.log("old",old)
    //     let comb = [...old,res.data];
    //     if(comb.length > 10){
    //         comb.shift();
            
    //     }
    //     localStorage.setItem('data',JSON.stringify(comb))
    //     console.log("combined",comb);
    //     //msglist.innerHTML+=`<li class="list-group-item" >${res.data.user.name} : ${res.data.msg}</li>`
    //      displaymsg()
    local(groupid);
     
    }
    catch(error){
        console.log(error)
    }
}