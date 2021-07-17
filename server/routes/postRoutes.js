const postController=require("../controllers/postController.js");
const {Router}=require("express");
const router=Router();


router.get("/",postController.get_all);
router.post("/post",postController.get_by);
router.post("/getbyor",postController.get_or);
router.post("/create",postController.create);
router.post("/like",postController.handle_like);
router.post("/comment/new",postController.new_comment);
router.delete("/delete",postController.delete);

module.exports=router;