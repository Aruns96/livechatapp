const User = require("../models/user");
const Msg = require("../models/message");
const Group = require("../models/group");
const UserGroup = require("../models/usergroups")
const {Op}=require('sequelize')





const postCreate = async(req,res)=>{
  
    try{
        let email=req.body.email
        email.push(req.user.email)
        let userid=req.user.id
        let grpname=req.body.name
        let users= await User.findAll({
            where:{email:{
                [Op.in]:email
            }}
        })
        let grp=await Group.create({
            name:grpname,
            adminId:userid
        })
        for(let i=0;i<users.length;i++){
        let usergroup=await UserGroup.create({
            userId:users[i].id,
            groupId:grp.id,
        })
        }
        res.status(200).json({success:true,users})
      

    }catch(e){
        res.status(500).json({error:e});
    }
}

const getShow = async(req,res)=>{
  
    try{
        let userid=req.user.id
        let usergroup=await UserGroup.findAll({
            attributes:['groupId'],
            where:{userId:userid}
        })
        let usergrp=[]
        for(let i=0;i<usergroup.length;i++){
            usergrp.push(usergroup[i].groupId)
        }


        let group=await Group.findAll({
            attributes:['id','name'],
            where:{id:{[Op.in]:usergrp}}
                    })

                    let admingroup=await Group.findAll({
                        attributes:['id','name','adminId'],
                        where:{id:{[Op.in]:usergrp},adminId:userid}
                    })
                console.log("grp and adm grp",group,admingroup)
                    res.status(200).json({group,admingroup})
                

    }catch(e){
        console.log(e)
        res.status(500).json({error:e});
    }
}
const edit=async(req,res,next)=>{
    try{
        let email=req.body.email
        let grpid=req.params.id
        let userid=req.user.id
        let grpname=req.body.name
        let users= await User.findAll({
            where:{email:{
                [Op.in]:email
            }}
        })
        let grp=await Group.findAll(
            {where:{id:grpid}}
            )
        for(let i=0;i<users.length;i++){
        let usergroup=await UserGroup.create({
            userId:users[i].id,
            groupId:grpid,
        })
        }
        res.status(200).json({success:true})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const users=async(req,res,next)=>{
    try{
        let grpid=req.params.id
        console.log(grpid)
        let userid=req.user.id
        let users=await UserGroup.findAll(
            {attributes:['userId'],
            where:{groupId:grpid}}
        )
        let uid=[]
        for(let i=0;i<users.length;i++){
           uid.push(users[i].userId) 
        }
        let user=await User.findAll({
            where:{[Op.and]:[{id:{[Op.in]:uid}},{id:{[Op.ne]:userid}}]}
        })
       //console.log('>>>>>>>>>>>',user)
        res.status(200).json(user)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const nusers=async(req,res,next)=>{
    try{
        let grpid=req.params.id
        console.log(grpid)
        let userid=req.user.id
        let users=await UserGroup.findAll(
            {attributes:['userId'],
            where:{groupId:grpid}}
        )
        let uid=[]
        for(let i=0;i<users.length;i++){
           uid.push(users[i].userId) 
        }
        let user=await User.findAll({
            where:{[Op.and]:[{id:{[Op.notIn]:uid}},{id:{[Op.ne]:userid}}]}
        })
       //console.log('>>>>>>>>>>>',user)
        res.status(200).json(user)
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const addU=async(req,res,next)=>{
    try{
        console.log(req.query)
        let email=req.query.uid
        let gpid=req.query.gpid
        let user=await User.findOne({
            where:{email:email}
        })
        let group=await Group.findOne({
            where:{id:gpid}
        })
        let user_group
        if(req.query.edit=='d'){
            console.log('success')
                user_group=await UserGroup.destroy({
                where:{userId:user.id,
                        groupId:group.id}
            })
        }
        else if(req.query.edit=='a'){
                console.log('hai')
                user_group=await UserGroup.create({
                userId:user.id,
                groupId:group.id
            })
        }
        else if(req.query.edit=='admin'){
            let id=user.id
            console.log(id)
            await Group.update({
                adminId:id},{
                where:{id:gpid}
            })
        }
        else if(req.query.edit=='grp'){
            console.log('hai')
            let name=req.query.name
            console.log(name)
            await Group.update({
                name:name},{
                    where:{id:gpid}
                }
            )
        }
        res.status(200).json(user_group)

    }
    catch(error){
        console.log(error)

    }
}
const deleteg=async(req,res,next)=>{
    try{
        let grpid=req.query.grpid
        let group=await Group.destroy({
            where:{id:grpid}
        })
        res.status(200).json()
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}
const remove=async(req,res,next)=>{
    try{
        let grpid=req.query.grpid
        let userid=req.user.id
        let group=await Group.findOne({
            where:{id:grpid}
        })
        let user_group=await UserGroup.destroy(
            {where:{userId:userid,groupId:grpid}}
        )
        res.status(200).json()
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}

module.exports ={postCreate,getShow,edit,users,nusers,addU,deleteg,remove}