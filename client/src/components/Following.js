import React,{useState,useContext, useEffect} from 'react'
import {userContext} from "../context/userContext"
import axios from "axios"
import Post from "./Post"


function Following() {

    const {user}= useContext(userContext);
    const [post,setPost]=useState(null);
    useEffect(()=>{

        const getPosts= async ()=>{
            const url ="http:localhost:5000/post/post/";
           let temp=[];

           user.following.forEach((el,indx)=>{
               const userFollowing=user.following[indx];
               axios.post(url,{
                   author:userFollowing
               }).then(res=>temp.push(res.data))
           })

           setTimeout(()=>{
               let merge=temp.flat();
               setPost(merge);
           },500)
        }

        getPosts();

    },[user])
    return (
        <div>

            {post===null?<h1> you are not following anyone</h1>:post.map(post=> <Post key={post._id} post={post}/>)}
           
            
        </div>
    )
}

export default Following
