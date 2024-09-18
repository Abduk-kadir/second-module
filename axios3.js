let express=require("express")

let app=express()
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"

    );
    res.header( "Access-Control-Expose-Headers","Authorization,X-Auth-Token")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With ,Content-Type, Accept,Authorization"

    );
    next();

   
});

const port=2410
app.listen(port,()=>console.log(`Node app is listinng${port}`))
let baseurl='https://repo-8qu2.onrender.com/productServer'
let axios=require('axios');
const { response } = require("express");

app.get('/myserver/customers',async function(req,res){

    try{
        let response=await axios.get(baseurl+'/customers')
        console.log(response.data)
        res.send(response.data)
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response
            console.log(status,statusText)
            res.status(status).send(statusText)

        }
        else{
            res.status(404).send(err)
        }

    }

})
app.get('/myserver/products',async function(req,res){

    try{
        let response=await axios.get(baseurl+'/products')
        console.log(response.data)
        res.send(response.data)
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response
            console.log(status,statusText)
            res.status(status).send(statusText)

        }
        else{
            res.status(404).send(err)
        }

    }

})

app.get('/myserver/orders',async function(req,res){

    let {cust,prod}=req.query
    let params={}
    if(cust)params.cust=cust
    if(prod)params.prod=prod
    console.log(params)
    try{
        let response=await axios.get(baseurl+'/orders',{params:{prod:params.prod,cust:params.cust}})
        console.log(response.data)
        res.send(response.data)
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(err)
        }

    }

})
app.get('/myserver/orders/customer/:cust',async function(req,res){
    let {cust}=req.params
    try{
        let response=await axios.get(`${baseurl}/orders/customer/${cust}`)
        console.log(response.data)
        res.send(response.data)
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(err)
        }

    }

})
app.get('/myserver/orders/product/:prod',async function(req,res){
    let {prod}=req.params
    try{
        let response=await axios.get(`${baseurl}/orders/product/${prod}`)
        console.log(response.data)
        res.send(response.data)
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(err)
        }

    }

})

app.post('/myserver/orders',async function(req,res){
    let {body}=req
    try{
        let response=await axios.post(baseurl+'/orders',body)
        console.log(response.data)
        res.send(response.data)
    }
    catch(err){
        if(err.response){
            let {status,statusText}=err.response
            console.log(status,statusText)
            res.status(status).send(statusText)
        }
        else{
            res.status(404).send(err)
        }

    }


})
