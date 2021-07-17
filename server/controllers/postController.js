const post=require("../models/post.js");
const user=require("../models/user.js");
const comment=require("../models/comments.js");

module.exports.get_all= (req,res)=>{

    post.find({},(err,posts)=>{
        err?res.status(400).json(err):res.json(posts.reverse());

        // for the latest order in which they are submitted

    }
    )}

module.exports.create=async (req,res)=>{
    post.create(req.body,(err,post)=>{
        err?res.json(err) : res.json(post);
    })
}


module.exports.delete=async (req,res)=>{
    if(req.body.postid){
        post.findByIdAndDelete(req.body.postid,(err)=>{
            err?res.status(400).json(err):res.json("post deletion done!")
        })
    }
    if(req.body.userid){
        post.findByIdAndDelete({authorId:req.body.userid},(err)=>{
            err?res.status(400).json(err):res.json("all post of this user deleted!")
        })
    }
}

module.exports.handle_like=async(req,res)=>{
    if(req.body){
        user.findById(req.body.userid,(err,user0)=>{

            err?res.json(err):
            (post.findById(req.body.postid,(err,post)=>{

                if(user0.likedposts.indexOf(req.body.postid)==-1){

                    user.findById(post.authorId,(err,user1)=>{
                        if(err) res.json(err);
                        user1.notifications.push(`you have new like ${post.title}`)
                        user1.save();

                    })

                    // if this post is not in the liked posts then push this posts to that array 

                    user0.likedposts.push(post._id);

                    // update the likes on the post
                    post.likes++;

                    // save the user and the post as post is the child of user
                    user0.save();
                    post.save();


                }
                else{
                    const index=user0.likedposts.indexOf(req.body.postid);
                    user0.likedposts.splice(index,1);
                    // remove this posts from liked posts
                   
                    post.likes--;
                    user0.save();
                    post.save();

                }

                res.json(post);

            }))
        }           
            )
    }
}

module.exports.new_comment=async(req,res)=>{
    if(req.body.postid && req.body.userid){
        comment.create({authorId:req.body.userid,postId:req.body.postid,content:req.body.content},(err,comment)=>{
            post.findById(req.body.postid,(err,post)=>{
                if(err) res.json(err);

                user.findById(post.authorId,(err,user)=>{
                    if(err) res.json(err);
                    user.notifications.push(`you have new comment on post ${post.title}`);
                })
                post.comments.push(comment);
                post.save();
                res.json(post);

            })
        })
    }
}


module.exports.get_by =async(req,res)=>{
    post.find(req.body,(err,posts)=>{
        err?res.json(err):res.json(posts);
    })
}

module.exports.get_or= async(req,res)=>{

    // to get all of the entries
    let body=Object.entries(req.body);
    let query={$or:[]};

    

    body.forEach((ob)=>{
        query.$or.push({"authorId":obj[1]});
    })

    post.find(query,(err,post)=>{
        err?res.json(err):res.json(post);

    })
}