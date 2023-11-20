const express = require("express");
const chatControllers = require("../controllers/chat");
const authorization = require("../middlewares/auth")
const fileupload=require('express-fileupload')
const router = express.Router();

router.get("/users",authorization.authorize,chatControllers.getUsers);
router.get('/users1',authorization.authorize,chatControllers.user1)
router.get('/susers',authorization.authorize,chatControllers.suser)
router.post("/send",authorization.authorize,chatControllers.postSend);
router.post('/upload',authorization.authorize,fileupload(),chatControllers.upload)

router.get("/msg",chatControllers.getMsg);
router.get("/lastmsg",chatControllers.getLastMsg)

module.exports = router;