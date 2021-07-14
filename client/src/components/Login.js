import React,{useState} from 'react'
import {Form,Button} from "react-bootstrap"
import axios from "axios"
import Profile from './Profile'
import { computeStyles } from '@popperjs/core'
function Login() {

  const[user,setUser]=useState(null);

    const handleLogin= (e)=>{


        e.preventDefault();
        const username= e.target.username.value;
        
        const password=e.target.password.value;

        axios.post("http://localhost:5000/user/login",{

        "username":username,
        "password":password

        })
        .then(res=>{setUser(res.data)

          localStorage.setItem("userid",res.data.user._id);
          // to store the data after login so that we dont login again and again
          
        });

        e.target.username.value="";
        e.target.password.value="";




    }

    let returnData;
    if(user===null){
      returnData=
        (<Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicUsername1">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" placeholder="Enter Username" />
            
          </Form.Group>
        
          <Form.Group controlId="formBasicPassword1">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" />
          </Form.Group>
        
          <Button variant="primary" type="submit">
          Login
          </Button>
  </Form>)
        
      
    }
    else{
      returnData=( <Profile user={user}/>)
       
      }



    
    return (
      returnData
        
    )
}

export default Login
