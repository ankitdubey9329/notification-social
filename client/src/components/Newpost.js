import React, { useEffect, useState,useContext } from 'react'
import axios from "axios"
import {userContext} from "../context/userContext"
import {Form,Button} from "react-bootstrap"

function Newpost() {

    const [message,setMessage]=useState("");
    const {user}=useContext(userContext);

    const handleSubmit=(e)=>{
        e.preventDefault();
        let title=e.target.post_title.value;
        let body=e.target.post_body.value;
        let userid=user._id;

        axios.post("http://localhost:5000/post/create",{
            "title":title,
            "authorId":userid,
            "body":body
        })
        .then(res=>setMessage("post is published!"))

    }

    return (
        <div>

              <h1>new post</h1>

            <Form onSubmit={handleSubmit}>

            <Form.Label>Title:</Form.Label>

            <Form.Control type="text" name="post title" placeholder="title here"  required/>
            <Form.Label>content:</Form.Label>

            <Form.Control type="text" name="post body" placeholder="content here"  required/>

            <p>{message}</p>

            <Button> sumbit post </Button>






               
            </Form>
            
        </div>
    )
}

export default Newpost
