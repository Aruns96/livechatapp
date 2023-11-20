const express = require("express");
const groupControllers = require("../controllers/group");
const authorization = require("../middlewares/auth")

const router = express.Router();

router.post("/create",authorization.authorize,groupControllers.postCreate);
router.get("/show",authorization.authorize,groupControllers.getShow);
router.patch('/edit/:id',authorization.authorize,groupControllers.edit)
router.get('/users/:id',authorization.authorize,groupControllers.users)
router.get('/users1/',authorization.authorize,groupControllers.users1)
router.get('/nusers/:id',authorization.authorize,groupControllers.nusers)
router.get('/nusers1/',authorization.authorize,groupControllers.nusers1)
router.get('/editU',authorization.authorize,groupControllers.addU)
router.get('/delete',authorization.authorize,groupControllers.deleteg)
router.get('/remove',authorization.authorize,groupControllers.remove)

module.exports = router;