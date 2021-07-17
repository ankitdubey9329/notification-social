const mongoose=require("mongoose");



const userSchema = new mongoose.Schema({

    username:{

        type:String,
        required:true,
        unique:true

    },

    password:{

        type:String,
        required:true,
        

    },

    following:{
        type:Array
    },
    
    likedposts:{
        type:Array
    },
    followers:{
        type:Array
    },

    notifications:{

        type:Array

    }


   





});



module.exports= mongoose.model("User",userSchema);