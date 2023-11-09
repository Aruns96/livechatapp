const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const sequelize = require("./utils/database")
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");


const app = express();
app.use(cors({
    origin:"*"
}));
app.use(bodyParser.json({extended:false}));
app.use("/user",userRoute);


sequelize.sync().then((result)=>{
    app.listen(3000);
   }).catch(e=>console.log(e))