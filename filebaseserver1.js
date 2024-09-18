let express=require("express")
let app=express()
let {customers}=require('./customerData')
let fs=require('fs')
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
const port=2410
app.listen(port,()=>console.log(`Node app is listinng${port}`))
let filename='cust.txt'
app.get('/resetData',function(req,res){
    console.log(customers)
    let obj=JSON.stringify(customers);
    fs.promises.writeFile(filename,obj)
    .then(()=>res.send('data is reset successfully'))
    .catch((err)=>res.status(404).send(err))
    
})
app.get('/customers',function(req,res){
    fs.promises.readFile(filename,'utf-8')
    .then((result)=>{
        let obj=JSON.parse(result)
        res.send(obj)
    })
    .catch((err)=>res.status(404).send(err))
    
})
app.post('/customers',function(req,res){
    let {body}=req
    fs.promises.readFile(filename,'utf-8')
    .then((result)=>{
        let obj=JSON.parse(result)
        let emp=obj[obj.length-1]
        console.log('emp is:',emp)
        let id=emp.id+1
        let newemp={id:id,...body}
        obj.push(newemp)
        let data=JSON.stringify(obj)
        fs.promises.writeFile(filename,data)
        .then(()=>res.send('data is written successfully'))
        .catch((err)=>res.status(404).send(err))
    })
    .catch((err)=>res.status(404).send(err))

})
app.delete('/customer/:id',function(req,res){
    let {id}=req.params
   
    fs.promises.readFile(filename,'utf-8')
    .then((result)=>{
        let obj=JSON.parse(result)
        let index=obj.findIndex(elem=>elem.id==id)
        obj.splice(index,1)
        let data=JSON.stringify(obj)
        fs.promises.writeFile(filename,data)
        .then(()=>res.send('employee is deleted  successfully'))
        .catch((err)=>res.status(404).send(err))
    })
    .catch((err)=>res.status(404).send(err))

})

