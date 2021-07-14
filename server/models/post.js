const mongoose =require("mongoose");

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    authorId:{
        type:String,
        required:[true,"no author id specified"]
    },

    date:{

        type:Date,
        default:Date.now

    },

    body:{
        type:String,
        required:[true,"Please enter content in the post"]

    },

    likes:{
        type:Number,
        default:0

    },
    comments:{
        type:Array
    }



});

const post= mongoose.model("Post",postSchema);

module.exports=post;