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
let baseurl='https://repo-8qu2.onrender.com/messageServer/'
let axios=require('axios');

app.post('/myserver2/login',function(req,res){
    let {body}=req;
    axios.post(baseurl+'/login',body)
    .then(response=>{
      
        res.send(""+response.data)
    })
    .catch(error=>{
        if(error.response)
        {
        let {status,statusText}=error.response
        console.log(status,statusText)
        res.status(status).send(statusText)
        }
        else{
            res.status(404).send(error)
        }
    })
})

app.post('/myserver2/messages',function(req,res){
    let token=req.headers['authorization']
    let {body}=req
    if(!token){
        res.status(404).send('no token found please provide valied token')
    }
    else{
         axios.post(baseurl+'/messages',body,{headers:{'Authorization':token}})
         .then(response=>{
            console.log(response.data)
            res.send(response.data)
         })
         .catch((error)=>{
            if(error.response){
                let {status,statusText}=error.response
                console.log(status,statusText)
                res.status(status).send(statusText)
            }
            else{
                res.status(404).send(error)
            }
         })
    }

   

})
