import React, { useEffect, useState,useContext,useCallback} from 'react'
import { userContext } from '../context/userContext';
import axios from "axios"
import {Link} from "react-router-dom"
import {Button,Form} from "react-bootstrap"
import Comment from './Comment';

function Post({post}) {
    const[postData,setPostData]=useState([post]);
    const {user}=useContext(userContext);
    let[author,setAuthor]=useState(null);



    useEffect(()=>{

        axios.post("http:localhost:5000/user",{
            userid:post.authorId
        }).then(res=>setAuthor(res.data.username));
        axios.post("http:localhost:5000/post/post",{

            "_id":post._id
            
        })






    },[])

    const likePost =useCallback(()=>{
        
        axios.post("http:localhost:5000/post/like",{
            "userid":user._id,
            "postid":post._id
        })
        .then(res=>setPostData(res.data));

        

    },[])
    const addComment =useCallback((e)=>{

         
        axios.post("http:localhost:5000/post/comment/new",{
            "userid":user._id,
            "postid":post._id,
            "comment":e.target.comment.value
        })
        .then(res=>setPostData(res.data));




    },[])
   

    return (
        <div>

            <div className="post-container">

            <h1>{postData.title}</h1>
            <h3><Link to={`/user/${postData.authorId}`}>{author}</Link></h3>
            <p>{postData.body}</p>
            <Button onCLick={likePost}>Like</Button>
            <h4>{postData.likes}</h4>


            </div>

            <div className="comment-container">

                {postData.comments.length>0?postData.comments.map(comment=>{
                    return <Comment key={comment._id} comment={comment}/>
                }):
                
                <h3> there are no comments</h3>}


            </div>


            <div className="new-comment">

                <Form onSubmit={addComment}>

                <Form.Group>

                <Form.Control type="text" name="username" placeholder="Enter Username" />

                </Form.Group>

                <Button>Publish</Button>

                   

                </Form>
            </div>
        </div>
    )
}

export default Post
