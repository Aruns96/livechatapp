const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user");


const app = express();
app.use(bodyParser.json({extended:false}));
app.use("/user",userRoute);


app.listen(3000);