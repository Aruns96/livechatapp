const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const sequelize = require("./utils/database")
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");
const chatRoute = require("./routes/chat");
const User = require("./models/user");
const Msg = require("./models/message");



const app = express();
app.use(cors({
    origin:"*"
}));
app.use(bodyParser.json({extended:false}));
app.use("/user",userRoute);
app.use("/chat",chatRoute);


User.hasMany(Msg);
Msg.belongsTo(User);


sequelize.sync().then((result)=>{
    app.listen(3000);
   }).catch(e=>console.log(e))