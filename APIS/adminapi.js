// create mini express app
const exp=require("express");
const adminApiObj=exp.Router();

// get req handler

adminApiObj.get("/getadmin",async(req,res,next)=>{
    let adminCollectionObject=req.app.get("adminCollectionObject")
    let users=await adminCollectionObject.find().toArray();
    res.send({message:users})
})
// export
module.exports=adminApiObj;
