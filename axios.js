let express=require("express")
let app=express()
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
let baseurl="https://repo-8qu2.onrender.com/productServer"
let axios=require('axios');
const { response } = require("express");
app.get('/myserver/customers',function(req,res){
    axios.get(baseurl+"/customers")
    .then(function(response){
        console.log(response)
        res.send(response.data)
    })
    .catch(function(error){
        if(error.response){
            let {status,statusText}=error.response 
            console.log(status,statusText)
            console.log(error.response)
            res.status(status).send(statusText)
        }
        else{
           
            res.status(404).send(error)
        }
    })
     
})

app.get('/myserver/products',function(req,res){

     axios.get(baseurl+'/products')
     .then((response)=>{
        console.log(response)
        res.send(response.data)
     })
     .catch((err)=>{
        if(err.response){
            let {status,statusText}=err.response
            res.status(status).send(statusText)
    
        }
        else{
            res.status(404).send(err)
        }
     })
})

app.get('/myserver/orders',function(req,res){
    let {cust,prod}=req.query
    let params={}
    if(cust)params.cust=cust;
    if(prod)params.prod=prod
    axios.get(baseurl+'/orders',{params:params})
    .then((response)=>{
       console.log(response)
       res.send(response.data)
    })
    .catch((err)=>{
       if(err.response){
           let {status,statusText}=err.response
           res.status(status).send(statusText)
   
       }
       else{
           res.status(404).send(err)
       }
    })
})

app.get('/myserver/orders/cutomers/:cust',function(req,res){
    let {cust}=req.params
    console.log(cust)
    axios.get(`${baseurl}/orders/customer/${cust}`)
    .then((response)=>{
       console.log(response)
       res.send(response.data)
    })
    .catch((err)=>{
       if(err.response){
           let {status,statusText}=err.response
           res.status(status).send(statusText)
   
       }
       else{
           res.status(404).send(err)
       }
    })
})

app.get('/myserver/orders/product/:prod',function(req,res){
    let {prod}=req.params
    console.log(prod)
    axios.get(`${baseurl}/orders/product/${prod}`)
    .then((response)=>{
       console.log(response)
       res.send(response.data)
    })
    .catch((err)=>{
       if(err.response){
           let {status,statusText}=err.response
           res.status(status).send(statusText)
   
       }
       else{
           res.status(404).send(err)
       }
    })
})
app.post('/myserver/orders',function(req,res){
   let obj =req.body
   console.log('obj is:',obj)
   axios.post(baseurl+'/orders',obj)
   .then((response)=>{
    console.log(response.data)
    res.send(response.data)
   })
   .catch((err)=>{
      if(err.response){
       console.log(err.response)
       let {status,statusText}=err.response
       res.status(status).send(statusText)
      }
      else{
        res.status(404).send(err)
      }

   })
})


