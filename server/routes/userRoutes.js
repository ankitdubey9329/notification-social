const {Router} = require("express");

const router= Router();

const userController= require("../controllers/userController.js")
const user= require("../models/user.js");

router.get("/",userController.get_all);
router.post("/follow",userController.follow_users);

router.post("/create",userController.post_signup);
router.post("/login",userController.post_login);
router.post("/notifications",userController.pop_notifications);
router.delete("/delall",userController.delete_all);


   
   
 module.exports= router;