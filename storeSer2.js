let express=require("express")
let app=express()
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
let filename='storeProduct.txt'
let filename2='storeRegister.txt'
let filename3='storeOrder.txt'

app.get('/products',function(req,res){
    let {category}=req.query
    fs.promises.readFile(filename,'utf-8')
    .then((result)=>{
        result=JSON.parse(result)
        if(category){
            result=result.filter(elem=>elem.category==category)
        }
        res.send(result)
    })
    .catch((err)=>{
        res.status(404).send(err)
    })
})
app.post('/login',function(req,res){
    let {body}=req
    fs.promises.readFile(filename2,'utf-8')
    .then((result)=>{
        result=JSON.parse(result)
        let person=result.find(elem=>elem.email==body.email&&elem.password==body.password)
        if(person){
            res.send(person)
        }
        else{
            res.status(401).send('please fill correct email and password')
        }
    })
    .catch((err)=>{
        res.status(404).send(err)
    })

})
app.post('/orders',async function(req,res){
    let {body}=req
    let json={name:body.name,city:body.city,building:body.building,email:body.email,sector:body.sector,total:body.total,items:body.items}
    try{
        await fs.promises.access(filename3)
        try{
        let result=await fs.promises.readFile(filename3,'utf-8')
        let objarr=JSON.parse(result)
        let maxid=objarr.reduce((acc,curr)=>curr.id>acc?curr.id:acc,0)
        objarr.push({...json,id:maxid+1})
        let str3=JSON.stringify(objarr)
        fs.promises.writeFile(filename3,str3)
        res.send('order successfull')
        }
        catch(err1){
            res.status(404).send(err1)
        }

    }
    catch(err){
        try{
            let newarr=[]
            json={...json,id:1}
            newarr.push(json)
            let str2=JSON.stringify(newarr)
            await fs.promises.writeFile(filename3,str2)
            res.send('data is written successfully')
        }
        catch(err2){
            res.status(404).send(err2)
        }
         
    }
    

})
app.get('/orders',function(req,res){
    fs.promises.readFile(filename3,'utf-8')
    .then((result)=>{
        result=JSON.parse(result)
        res.send(result)
    })
    .catch((err)=>{
        res.status(404).send(err)
    })

})
app.post('/addProduct',async function(req,res){
    let {body}=req;
    let {name,price,category,description,imageLink}=body
    let json={name:name,price:price,category:category,description:description,imageLink:imageLink}
    try{
        let result=await fs.promises.readFile(filename,'utf-8')
        let objarr=JSON.parse(result)
        let maxid=objarr.reduce((acc,curr)=>curr.id>acc?curr.id:acc,0)
        objarr.push({...json,id:maxid+1})
        let str3=JSON.stringify(objarr)
        fs.promises.writeFile(filename,str3)
        res.send('order successfull')
        }
        catch(err1){
            res.status(404).send(err1)
        }
   
 })

 app.put('/products/:id',async function(req,res){
    let {body}=req
    let {id}=req.params
    try{
        let result=await fs.promises.readFile(filename,'utf-8')
        let objarr=JSON.parse(result)
        let index=objarr.findIndex(elem=>elem.id==id)
        objarr[index]={...body,id:id}
        let str3=JSON.stringify(objarr)
        fs.promises.writeFile(filename,str3)
        res.send('updated successfull')
        }
        catch(err1){
            res.status(404).send(err1)
        }
})
app.delete('/products/:id',async function(req,res){
 
    let {id}=req.params
    try{
        let result=await fs.promises.readFile(filename,'utf-8')
        let objarr=JSON.parse(result)
        let index=objarr.findIndex(elem=>elem.id==id)
        objarr.splice(index,1)
        let str3=JSON.stringify(objarr)
        fs.promises.writeFile(filename,str3)
        res.send('item deleted successfully')
        }
        catch(err1){
            res.status(404).send(err1)
        }
})


