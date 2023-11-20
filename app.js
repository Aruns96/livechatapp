const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const cors = require("cors");
const sequelize = require("./utils/database")
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const chatRoute = require("./routes/chat");
const groupRoute = require("./routes/group");

const User = require("./models/user");
const Msg = require("./models/message");
const Group = require("./models/group");
const UserGroup = require("./models/usergroups");



const app = express();
app.use(cors({
    origin:"*"
}));
app.use(bodyParser.json({extended:false}));
app.use("/user",userRoute);
app.use("/chat",chatRoute);
app.use("/group",groupRoute);

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,`./public/${req.url}`))
})

User.hasMany(Msg);
Msg.belongsTo(User);
User.belongsToMany(Group,{through:UserGroup});
Group.belongsToMany(User,{through:UserGroup});
Group.hasMany(Msg)
Msg.belongsTo(Group)


sequelize.sync().then((result)=>{
    app.listen(3000);
   }).catch(e=>console.log(e))