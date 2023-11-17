const express = require("express");
const groupControllers = require("../controllers/group");
const authorization = require("../middlewares/auth")

const router = express.Router();

router.post("/create",authorization.authorize,groupControllers.postCreate);
router.get("/show",authorization.authorize,groupControllers.getShow);
router.patch('/edit/:id',authorization.authorize,groupControllers.edit)
router.get('/users/:id',authorization.authorize,groupControllers.users)
router.get('/nusers/:id',authorization.authorize,groupControllers.nusers)
router.get('/editU',authorization.authorize,groupControllers.addU)
router.get('/delete',authorization.authorize,groupControllers.deleteg)
router.get('/remove',authorization.authorize,groupControllers.remove)

module.exports = router;