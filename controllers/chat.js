const User = require("../models/user");
const Msg = require("../models/message");
const {Op}=require('sequelize');
const S3service=require('../service/awss3')


const getUsers = async(req,res)=>{
  
    try{
        
        //let users = await User.findAll();
            //console.log("userslist",users);
            let userId=req.user.id;
            //console.log(userId);
        let users=await User.findAll({
            where:{id:{[Op.not]:userId}}
        });
       // console.log(users);
         res.status(200).json(users);  
      

    }catch(e){
        res.status(500).json({error:e});
    }
}
const postSend = async(req,res)=>{
  
    try{
        let msg=req.body.data.msg
        let id=req.user.id
       
       
       // await Msg.create({msg,userId:id})
       let groupid=req.body.data.groupid
       if(groupid==0){
           groupid=null
       }
       console.log('>>>>>>>>>',msg,groupid)
       await Msg.create({msg,userId:id,groupId:groupid})
        res.status(200).json({success:true,message:'Message Send'})
            
           
      

    }catch(e){
        res.status(500).json({error:e});
    }
}

const getMsg = async(req,res)=>{
  
    try{
        let groupid=req.query.groupid
        if(groupid==0){
            console.log('hai')
            groupid=null
        }
        console.log('>>>>>>>',groupid)
        let msg1=await Msg.findAll({
            limit:1,
            order:[['id','DESC']],
            where:{groupId:{[Op.eq]:groupid}}
        })
        console.log('>>>>>>>',msg1)
        let id
        if(msg1==[]){
            id=msg1[msg1.length-1].id-20
        }
        else{
            id=-1
        }

        // let msg = await Msg.findAll({attributes:['id','msg'],
       
        // include:{model:User,attributes:['name']}});
        // //console.log(msg);
       
        let msgs=await Msg.findAll({
            
            attributes:['id','msg'],
            where:{id:{[Op.gt]:id},groupId:{[Op.eq]:groupid}},
            include:{model:User,attributes:['name']}

        })   
             res.status(200).json(msgs)
      

    }catch(e){
        res.status(500).json({error:e});
    }
}

const getLastMsg = async(req,res)=>{
  
    try{
        // let msg = await Msg.findAll({attributes:['id','msg'],
       
        // include:{model:User,attributes:['name']}});
        // //console.log(msg);
        //  let lastmsg =  msg[msg.length-1];
         //console.log(lastmsg);
         let groupid=req.query.groupid
         console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',req.query)
         if(groupid==0){
             groupid=null
         }
         const msgid=req.query.msgid
         let lastmsg=await Msg.findAll({
             attributes:['id','msg'],
             where:{id:{[Op.gt]:msgid},groupId:groupid},
             include:{model:User,attributes:['name']}
         })
        res.status(200).json(lastmsg)
            
           
      

    }catch(e){
        res.status(500).json({error:e});
    }
}

const suser=async(req,res,next)=>{
    let data=req.query.data
    let user=await User.findAll({
        where:{[Op.or]:[{
            name:{[Op.like]: '%'+data+'%'}
        }]}
    })
   
    res.status(200).json(user);
}
const upload=async(req,res,next)=>{
    try{
        let userId=req.user.id
        let groupid=req.query.gpid
        if(groupid==0){
            groupid=null
        }
        const file =req.files.file
        const filename=`${userId}/${new Date()}${file.name}`
        const fileUrl=await S3service.uploadToS3(file,filename)
        await Msg.create({msg:fileUrl,userId:userId,groupId:groupid})
        res.status(200).json({success:true,message:'Message Send'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const user1=async(req,res,next)=>{
    try{
        let data=req.query.data
        let userId=req.user.id
        let users=await User.findAll({
            where:{id:{[Op.not]:userId},name:{[Op.like]: `%${data}%`}}
        })
        res.status(200).json(users)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}

module.exports ={getUsers,postSend,getMsg,getLastMsg,suser,upload,user1}