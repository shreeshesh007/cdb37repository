// create mini express app
const exp=require("express");
const userApiObj=exp.Router();
const errorHandler=require("express-async-handler");
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")

require("dotenv").config();


const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer");
const verifyToken = require("./middlewares/verifytoken");


cloudinary.config({
    cloud_name:'dvndekwal',
    api_key:'138576663158793',
    api_secret:'04cXLHEJ8DLNqK7lBrRI7DLvoiE'
   });


   const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    
    folder:"myphotos",
    format:async(req,file)=> png,
    public_id:(req,file)=> file.fieldname + '-' + Date.now()
    }
   });

   var upload = multer({ storage: storage });

   userApiObj.get("/getusers",errorHandler(async(req,res,next)=>{
       userCollectionObject=req.app.get("userCollectionObject");
       users=await userCollectionObject.find().toArray();
       res.send({message:users});
   }))





//    get user
   userApiObj.get("/getuser/:username",verifyToken,errorHandler(async(req,res,next)=>{
       userCollectionObject=req.app.get("userCollectionObject");
       
       let userObj=await userCollectionObject.findOne({username:req.params.username});
       res.send({message:"success",user:userObj});
   }))











userApiObj.use(exp.json());

// get req handler
userApiObj.post("/register",upload.single('photo'),errorHandler( async(req,res,next)=>{

console.log("url is",req.app.get("userCollectionObject"))


    let userCollectionObject=req.app.get("userCollectionObject");
    userObj=JSON.parse(req.body.userObj);



    let userObj=req.body;
//   check for user in database
let user=await userCollectionObject.findOne({username:userObj.username})
// if user existed
if(user!==null){
res.send({message:"user existed"})
}
else{
let hashedpw=await bcryptjs.hash(userObj.password,5)
userObj.password=hashedpw;

userObj.userImgLink=req.file.path;
console.log("user is",userObj)



let success=await userCollectionObject.insertOne(userObj)   
    res.send({message:"user created"})
}
}))












userApiObj.post("/login",errorHandler(async(req,res,next)=>{
    userCollectionObject=req.app.get("userCollectionObject");
    userCredObj=req.body;
user=await userCollectionObject.findOne({username:userCredObj.username});
if(user==null)
{
    res.send({message:"Invalid username"})
    
}
else{







    status=await bcryptjs.compare(userCredObj.password,user.password);
    if(status)
    {
        token=await jwt.sign({username:user.username},process.env.secret,{expiresIn:10});
        res.send({message:"success",signedToken:token,username:user.username});

    }
    else{
        res.send({message:"Invalid Password"});
    }
}}))

// export
module.exports=userApiObj;