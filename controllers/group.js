const User = require("../models/user");
const Msg = require("../models/message");
const Group = require("../models/group");
const UserGroup = require("../models/usergroups")
const {Op}=require('sequelize')





const postCreate = async(req,res)=>{
  
    try{
        let email=req.body.email
        email.push(req.user.email)
        let grpname=req.body.name
        let users= await User.findAll({
            where:{email:{
                [Op.in]:email
            }}
        })
        let grp=await Group.create({
            name:grpname,
        })
        for(let i=0;i<users.length;i++){
        let usergroup=await UserGroup.create({
            userId:users[i].id,
            groupId:grp.id,
        })
        }
        res.status(200).json({success:true})
      

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

        res.status(200).json(group)

    }catch(e){
        res.status(500).json({error:e});
    }
}


module.exports ={postCreate,getShow}