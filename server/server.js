const express= require("express");
const cors=require("cors");
const mongoose= require("mongoose");
const userRoutes=require("./routes/userRoutes.js")
const postRoutes=require("./routes/postRoutes.js")


 
require("dotenv").config({path:"./config/.env"})
const mongoURI=process.env.mongoURI
 
mongoose.connect(mongoURI,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
    useCreateIndex:true
})

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection is faulty"));

db.once("open",()=>{
    console.log("cluster connected");
})
 const app= express();
 app.use(cors());
 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 app.use(express.json());

 app.use("/user",userRoutes);
 app.use("/post",postRoutes);
 

 

 app.listen(5000,()=>{
     console.log("the server has started");
 })