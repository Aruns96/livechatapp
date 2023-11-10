const express = require("express");
const chatControllers = require("../controllers/chat");
const authorization = require("../middlewares/auth")

const router = express.Router();

router.get("/users",authorization.authorize,chatControllers.getUsers);
router.post("/send",authorization.authorize,chatControllers.postSend);

router.get("/msg",chatControllers.getMsg)

module.exports = router;