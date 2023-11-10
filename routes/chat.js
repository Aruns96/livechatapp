const express = require("express");
const chatControllers = require("../controllers/chat");
const authorization = require("../middlewares/auth")

const router = express.Router();

router.get("/users",chatControllers.getUsers);
router.post("/send",authorization.authorize,chatControllers.postSend);

router.get("/msg",chatControllers.getMsg);
router.get("/lastmsg",chatControllers.getLastMsg)

module.exports = router;