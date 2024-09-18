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

app.get('/resetData',async function(req,res){
    let data=JSON.stringify(customers)
    try{
       await fs.promises.writeFile(filename,data)
       res.send('data is reset successfully')
    }
    catch(err){
        res.send(err)
    }

})
app.get('/customers',async function(req,res){
    try{
        let result=await fs.promises.readFile(filename,'utf-8')
        let obj=JSON.parse(result)
        res.send(obj)
    }
    catch(err){
        res.send(err)
    }
})
app.post('/customers',async function(req,res){
    let {body}=req
    try{
        let result=await fs.promises.readFile(filename,'utf-8')
        let obj=JSON.parse(result)
        let emp=obj[obj.length-1]
        console.log('emp is:',emp)
        let id=emp.id+1
        let newemp={id:id,...body}
        obj.push(newemp)
        let data=JSON.stringify(obj)
        await fs.promises.writeFile(filename,data)
        res.send(newemp)
    }
    catch(err){
        res.send(err)
    }
})
app.put('/customers/:id',async function(req,res){
    let {body}=req
    let {id}=req.params
    try{
       let result=await fs.promises.readFile(filename,'utf-8');
       let arr=JSON.parse(result)
       let index=arr.findIndex(elem=>elem.id==id)
       if(index>-1){
          arr[index]={id,...body}
          await fs.promises.writeFile(filename,JSON.stringify(arr))
          res.send({id,...body})
       }
       else{
         res.status(404).send('no id is found for editing')
       }
    }
    catch(err){
        res.status(404).send(err)
    }

})