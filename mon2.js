let express=require("express");
const { copyFileSync } = require("fs");
let app=express()
const mongoose=require('mongoose')
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"

    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With ,Content-Type, Accept"

    );
    next();

   
});
mongoose.connect('mongodb://127.0.0.1:27017/library')
  .then(() => console.log('Connected!'));
const bookSchema=new mongoose.Schema({
    name:String,
    price:Number,
    page:Number
 })
let bookModel = mongoose.model("books",bookSchema)
const port=2410
app.listen(port,()=>console.log(`Node app is listinng${port}`))
app.get('/getdata',async function(req,res){
  let result= await bookModel.find()
   console.log(result)
   
   

})
app.put('/updatedata/:id',function(req,res){
    let {id}=req.params
    let {body}=req
   let {name,page}=body
    bookModel.updateOne({_id:id},{$set:{name:name,page:page}})
    .then((result)=>res.send(result))
    .catch((err)=>res.status(404).send(err))
})

app.get('/insertdata',function(req,res){
    let {id}=req.params
    let {body}=req
    let {name,page}=body
    let arr=[
            {name:"khan book",page:"34",price:4898}
        ]
    bookModel.insertMany(arr)
    .then((result)=>res.send(result))
    .catch((err)=>res.status(404).send(err))
})

