const { json } = require("express")
let express=require("express")
let app=express()
const { Client } = require("pg");
let {arr}=require('./myStoreData.js')
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
const client=new Client({
    user:"postgres",
    password:"iltutmish@2022",
    database:"postgres",
    port:5432,
    host:"db.flfurqnvbdlcuhsyrwoz.supabase.co",
    ssl:{rejectUnauthorized:false}
})
client.connect(function(res,err){
    console.log('connect ot superbase data base')
})

app.listen(port,()=>console.log(`Node app is listinng${port}`))

app.get('/products',function(req,res){
 let sql='select * from products'
 client.query(sql,function(err,result){
    if(err){
        res.status(404).send(result)
    }
 })
    
})
app.post('/login',function(req,res){
    let {body}=req
    let sql='Select * from Register'
    connnection.query(sql,function(err,result){
        if(err){
            res.status(404).send(err)
        }
        else{
            let person=result.find(elem=>elem.email==body.email&&elem.password==body.password)
            if(person){
                res.send(person)
            }
            else{
                res.status(401).send('please fill correct email and password')
            }
        }

    })
})
app.post('/orders',function(req,res){
    let {body}=req
    let sql='insert into orders(name,city,building,email,sector,total,items) values(?,?,?,?,?,?,?)'
    let arr=[body.name,body.city,body.building,body.email,body.sector,body.total,body.items]
    connnection.query(sql,arr,function(err,result){
        if(err){
            res.status(404).send(err)
        }
        else{
            res.send(result)
        }

    })
})
app.put('/products/:id',function(req,res){
    let {body}=req
    let {id}=req.params
    let {name,description,category,price}=body
    arr=[name,category,price,description,id]
   
    let sql='update products set name=?,category=?,price=?,description=? where id=?'
   
    connnection.query(sql,arr,function(err,result){
        if(err){
            res.status(404).send(err)
        }
        else{
            res.send(result)
        }

    })
})
app.get('/orders',function(req,res){
    let sql='select * from orders'
    connnection.query(sql,function(err,result){
        if(err){
            res.status(404).send(err)
        }
        else{
            res.send(result)
        }
    })
})
app.post('/addProduct',function(req,res){
   let {body}=req;
   let {name,price,category,description,imageLink}=body
   arr=[name,price,category,description,imageLink]
   let sql='insert into products(name,price,category,description,imageLink) values(?,?,?,?,?)'
   connnection.query(sql,arr,function(err,result){
    if(err){
        res.status(404).send(err)
    }
    else{
        res.send(result)
    }
   })
})

