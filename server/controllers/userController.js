const user=require("../models/user.js");
const post=require("../models/post.js");
const bcrypt=require("bcrypt");
const missingUser="no user is present man!"
const user_error="ther is no user here"
module.exports.get_all=(req,res)=>{
    user.find({},(err,user)=>err?res.json(err):res.json(user));
}



module.exports.post_signup=async (req,res)=>{

  

    if(req.body){

        const {username,password}=req.body;
        const newUser= new user({username,password});

        const saltRounds=10;

        
        
        bcrypt.genSalt(saltRounds,  function(err, salt) {

            bcrypt.hash(req.body.password, salt, function(err, hash) {
               if(err) throw err;
                newUser.password=hash;
              newUser.save().then(user=>{
                   res.json({
                       user:{
                           id:user._id,
                           username:user.username
                       }
                   })
               })
            });
        });

    }

    else{
        res.status(400).json(missingUser);
    }
}


module.exports.post_login=async (req,res)=>{
  
    if(req.body){

       

        const u = req.body.username;
       
        user.findOne({username:u},(err,user1)=>{
// here we use findOne which returns the first matching document rather than find() which returns the cursor to the document and if not found it will return some defined value
          
            err?res.status(400).json(err):(



                bcrypt.compare(req.body.password,user1.password)
                .then((result)=>{
                    if(result){
                        res.status(200).json(user1);
                    }
                    else{
                        res.json(" the password is incorrect")
                    }
                })
            )
        })

    }

    else{
        res.status(400).json(missingUser);
    }
}

module.exports.follow_users=async (req,res)=>{
    if(req.body.userid  && req.body.otheruserid){

        user.findById(req.body.userid,(err,user1)=>{
            if(err) res.json(err);
            user.findById(req.body.otheruserid,(err,otheruser)=>{
                if(err) res.json(err);
            

            if(user1.following.indexOf(req.body.postid)===-1){

                //make user 1 follow other user and update the same in list of followers of otheruser
                user1.following.push(req.body.otheruserid);
                otheruser.followers.push(req.body.userid);

               

                // save the user and other user
                user1.save();
                otheruser.save();


            }
            else{
                const index=user1.following.indexOf(req.body.otheruserid);
                user1.following.splice(index,1);
                // user 1 does not follow other user
               
                const index2=otheruser.followers.indexOf(req.body.userid);
                otheruser.followers.splice(index2,1);
                //other user does not have previous user(user 1) as followers
               
                
                user1.save();
                otheruser.save();
                //save both

            }

            res.json(otheruser);

        })

        }
        )

    }
    
    else{
        res.json("who are you following");
    }
}

module.exports.delete_all=(req,res)=>{
    user.deleteMany({},()=>{
        post.deleteMany({},(err)=>{
            err?res.json(err):res.json("all data is gone!");
        });
    });
}