const exp=require("express")
const app=exp();
const mc=require("mongodb").MongoClient;
const path=require("path");
// import dotenv
require("dotenv").config();

// connect angular with web server
app.use(exp.static(path.join(__dirname,"dist/completeapp")))




// import api objects

const userApiObj=require("./APIS/userapi")
// const productApiObj=require("./APIS/productapi")
const adminApiObj=require("./APIS/adminapi")

// forward req object to specific api based on path

app.use("/user",userApiObj)
// app.use("/product",productApiObj)
app.use("/admin",adminApiObj)


// database url
const dburl=process.env.dburl;
// db connectivity
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
    // get db object
    const databaseObj=client.db("cdb37")
    const userCollectionObject=databaseObj.collection("usercollection");
    // const productCollectionObject=databaseObj.collection("productcollection");
    const adminCollectionObject=databaseObj.collection("admincollection");

    // sharing collection
    app.set("userCollectionObject",userCollectionObject)
    // app.set("productCollectionObject",productCollectionObject)
    app.set("adminCollectionObject",adminCollectionObject)


})

.catch(err=>console.log("error in connection",err))


app.use((req,res,next)=>{
    res.send({message:"Invalid path"})
})

app.use((err,req,res,next)=>{
    res.send({message:"error occured",reason:err.message})

})



const port=process.env.port||8080
app.listen(port,()=>console.log(`webserver on port ${port}`))