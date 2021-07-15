import React,{useState,useContext, useEffect} from 'react'
import {userContext} from "../context/userContext"
import axios from "axios"
import Post from "./Post"
function Likes() {

    const {user}= useContext(userContext);
    const [post,setPost]=useState([]);
   

        const getPosts= async ()=>{
            const url ="http:localhost:5000/post/post";
           let temp=[];

           user.likedposts.forEach(postid=>{
             
               axios.post(url,{
                  "_id":postid
               }).then(res=>temp.push(res.data[0]))
           })

           setTimeout(()=>{
               setPost(temp)
           },500)
        }

        useEffect(()=>{

        getPosts();

    },[])
    return (
        <div>
            <h3>{user.username}'s likes</h3>
            <div className="post">
                {post!==null? post.map(post=>{

                    return <Post key={post._id} post={post}/>

                }):<h1>no likes yet</h1>}
            </div>
        </div>
    )
}

export default Likes
