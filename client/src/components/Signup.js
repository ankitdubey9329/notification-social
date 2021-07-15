import axios from 'axios';
import React from 'react'
import {Form,Button} from "react-bootstrap"

function Signup() {

    const handleSignup= async (e)=>{

        e.preventDefault();
        const username= e.target.username.value;
        
        
        const password=e.target.password.value;
        

        

        axios({
          method: 'post',
          url:"http://localhost:5000/user/create",
          headers: {}, 
          data: {
            "username":username, 
            "password":password// This is the body part
          }
        })
        
        .then(data=>console.log(data));

        e.target.username.value="";
        e.target.password.value="";




    }


    
    return (
        <Form onSubmit={handleSignup}>
        <Form.Group controlId="formBasicUsername2">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" placeholder="Enter Username" />
          
        </Form.Group>
      
        <Form.Group controlId="formBasicPassword2">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Password" />
        </Form.Group>
       
        <Button variant="primary" type="submit">
      Signup
        </Button>
      </Form>
    )
}

export default Signup
