import React, { useEffect, useState ,useCallback} from 'react'
import axios from "axios"
import Post from "./Post"
import {Button} from "react-bootstrap"

function Otheruser({match}) {

    const[post,setPost]=useState([]);
    const[following,setFollowing]=useState(false);
    const[otherUser,setOtherUser]=useState(null);

    useEffect(()=>{
        axios.post("http://localhost:5000/user",{
            "userid":localStorage.getItem("userid")
        })
        .then(res=>{
            if(res.data.following.indexOf(match.params.userid)!==-1) setFollowing(true);
            else setFollowing(false);
        });

        axios.post("http://localhost:5000/post/post",{
            "authorId":match.params.userid
        }).then(res=>setPost(res.data));
        
        axios.post("http://localhost:5000/user/",{
            "userid":match.params.userid
        }).then(res=>setOtherUser(res.data));



    },[]);

    const followUser =useCallback(()=>{
        let userid=localStorage.getItem("userid");
        let otheruserid=match.params.userid
        axios.post("http://localhost:5000/user/follow",{
            "userid":userid,
            "otheruserid":otheruserid
        })

        setFollowing(!following);
        },[])
    return (
        <div>
              <h3>{otherUser!==null?otherUser.username:"loading.."} profile</h3>
              {following===false?<Button onClick={followUser}>follow</Button>:<Button onClick={followUser}>Unfollow</Button>}


              <div className="post">
                  {
                      post!==null?post.map(post=>{
                          return <Post key={post._id} post={post}/>
                      }):<h1> no posts as of now!</h1>
                  }
              </div>
            
        </div>
    )
}

export default Otheruser
