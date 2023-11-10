const User = require("../models/user");
const Msg = require("../models/message");



const getUsers = async(req,res)=>{
  
    try{
        
        let users = await User.findAll();
            //console.log("userslist",users);
         res.status(200).json({users});  
      

    }catch(e){
        res.status(500).json({error:e});
    }
}
const postSend = async(req,res)=>{
  
    try{
        let msg=req.body.data
        let id=req.user.id
       
       
        await Msg.create({msg,userId:id})
        res.status(200).json({success:true,message:'Message Send'})
            
           
      

    }catch(e){
        res.status(500).json({error:e});
    }
}

const getMsg = async(req,res)=>{
  
    try{
        let msg = await Msg.findAll({attributes:['id','msg'],
       
        include:{model:User,attributes:['name']}});
        //console.log(msg);
        res.status(200).json(msg)
            
           
      

    }catch(e){
        res.status(500).json({error:e});
    }
}

const getLastMsg = async(req,res)=>{
  
    try{
        let msg = await Msg.findAll({attributes:['id','msg'],
       
        include:{model:User,attributes:['name']}});
        //console.log(msg);
         let lastmsg =  msg[msg.length-1];
         //console.log(lastmsg);
        res.status(200).json(lastmsg)
            
           
      

    }catch(e){
        res.status(500).json({error:e});
    }
}


module.exports ={getUsers,postSend,getMsg,getLastMsg}