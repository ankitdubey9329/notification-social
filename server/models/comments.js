const mongoose=require("mongoose");

const commentSchema=new mongoose.Schema({
    authorId:{
        type:String,
        required:true
    },
   content:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    }
}) ;

const comment=mongoose.model("Comment",commentSchema);

module.exports=comment;