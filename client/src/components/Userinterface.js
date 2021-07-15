import React,{useState,useMemo,useEffect} from 'react'
import Axios from "axios"
import {userContext} from "../context/userContext"
import{BrowserRouter,Route,Redirect} from "react-router-dom"

import Login from "./Login"
import Signup from './Signup'
import Home from './Home'
import Navbartop from './Navbar'
import Likes from "./Likes"
import Profile from './Profile'
import Newpost from './Newpost'
import Otheruser from './Otheruser'
import Following from './Following'

function Userinterface() {

    const[user,setUser]=useState(null);
    const currentUser=useMemo(() => ({user,setUser}), [user,setUser])

    console.log(currentUser);
    useEffect(() => {
       if(localStorage.getItem('userid')!==null)
      Axios.post("http://localhost:5000/user/",{
          "userid":localStorage.getItem("userid")
      })
      .then(res=>setUser(res.data))
    }, []);


    return (
        <div>
            <userContext.Provider value={currentUser}>
                 <BrowserRouter>
                <Navbartop/>
                 <Route path="/" exact component={Home}/>
                 <Route path="/login"  component={Login}>
                     {user!==null?<Redirect to="/profile"/>:<Login/>}
                 </Route>    
                <Route path="/signup" >
                   {user!==null?<Redirect to="/profile"/>:<Signup/>}
                </Route>      
                <Route path="/newpost" >
                   {user!==null?<Redirect to="/login"/>:<Newpost/>}
                </Route>      
                <Route path="/likes" >
                   {user!==null?<Redirect to="/login"/>:<Likes/>}
                </Route>      
                <Route path="/following" >
                   {user!==null?<Redirect to="/login"/>:<Following/>}
                </Route>      
                <Route path="/profile" >
                   {user!==null?<Redirect to="/login"/>:<Profile/>}
                </Route>   
                <Route exact path="/user/:userid" component={Otheruser}/> 
               {/* this route is for rendering something other than the context user */}




                </BrowserRouter>

            </userContext.Provider>
        </div>
    )
}

export default Userinterface
