const express = require("express");
const groupControllers = require("../controllers/group");
const authorization = require("../middlewares/auth")

const router = express.Router();

router.post("/create",authorization.authorize,groupControllers.postCreate);
router.get("/show",authorization.authorize,groupControllers.getShow);

module.exports = router;