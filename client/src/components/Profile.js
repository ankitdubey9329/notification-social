import React,{useContext,useEffect,useState}from 'react'
import axios from "axios"
import { userContext } from '../context/userContext'
import Post from "./Post"



function Profile() {

    const {user}=useContext(userContext);
    const[post,setPost]=useState([]);
    useEffect(()=>{

        axios.post("http://localhost:5000/post/post",{
            "authorId":user._id
        })
        .then(res=>setPost(res.data));

    },[user._id])
    return (
        <div>
            <h1>{user.username} posted :</h1>
            

                <div>
               {
               
               post!==null?post.map(post=>{
                    return <Post key={post._id} post={post}/>
                }
                ):<h1>there are no posts</h1>
                
                }
                </div>
                
                
            
        </div>
    )
}

export default Profile
