const User = require("../models/user");
const bcrypt = require("bcrypt");



const postSignup = async(req,res)=>{
  
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        if(name == undefined || name.length == 0 || email == undefined || email.length == 0 ||  phone == undefined || phone.length == 0 ||password == undefined || password.length == 0){
          return   res.status(400).json({err:"bad params"});
        }
        bcrypt.hash(password,10, async(err,hash)=>{
            if(err){
                throw new Error("something went wrong");
            }
            await User.create({name:name,email:email,phone:phone,password:hash});
            res.status(201).json({message:"user created"});
        })
        
       


    }catch(e){
        res.status(500).json({error:e});
    }
}




module.exports ={postSignup}