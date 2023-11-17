const express = require("express");
const chatControllers = require("../controllers/chat");
const authorization = require("../middlewares/auth")

const router = express.Router();

router.get("/users",authorization.authorize,chatControllers.getUsers);
router.get('/susers',authorization.authorize,chatControllers.suser)
router.post("/send",authorization.authorize,chatControllers.postSend);

router.get("/msg",chatControllers.getMsg);
router.get("/lastmsg",chatControllers.getLastMsg)

module.exports = router;