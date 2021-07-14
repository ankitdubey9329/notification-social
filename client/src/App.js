import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Signup from "./components/Signup"
import Layout from "./components/Layout"
import Home from "./components/Home"
import {BrowserRouter as Router,Route} from "react-router-dom"
 
function App() {


  return (
    <div className="App">
      
    <Router>
      <Layout>

        <Route path="/" exact component={Home}/>
        <Route path="/login"  component={Login}/>
        <Route path="/signup"  component={Signup}/>
      </Layout>
    </Router>
    </div>
  );
}

export default App;
