let express=require("express")
let fs=require('fs')
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
//app.use(detail)
const port=2410
app.listen(port,()=>console.log(`Node app is listinng${port}`))
let baseurl='https://repo-8qu2.onrender.com/studentServer'
let axios=require('axios')
let filename='detail.txt'
function detail(req,res,next){
    let {body}=req
    console.log('body is:',body)
    let js={method:req.method,url:'localhost:2410'+req.url,body:body?body:null}
    fs.promises.access(filename)
    .then(()=>{
        fs.promises.readFile(filename,'utf-8')
        .then((result)=>{
            let arr=JSON.parse(result)
            arr.push(js)
            console.log(arr)
            let str=JSON.stringify(arr)
            fs.promises.writeFile(filename,str)
            .then(()=>{
                console.log('data is written successfully')
            })
            
        })
        .catch((err)=>{
            console.log('data is not read successfully')
        })
    })
    .catch((err)=>{
     
        let arr=[]
        arr.push(js)
        fs.promises.writeFile(filename,JSON.stringify(arr))
        .then(()=>{
            console.log('data is written is successfully')
        })
        .catch((err)=>{
            console.log('data is not written successfully')
        })
    })
    next()
}


app.get('/students/:id',detail,async function(req,res){
   let token=req.headers['authorization']
   let {id}=req.params
    if(!token){
        res.status(401).send('no token found please provide valid token')
    }
    else{

        try{
            let response=await axios.get(`${baseurl}/students/${id}`,{headers:{'Authorization':""+token}})
            console.log('respnse is:',response.data)
            res.send(response.data)
        }
        catch(err){
            if(err.response){
                let {status,statusText}=err.response
                console.log('err is:',status,statusText)
                res.status(status).send(statusText)
            }
            else{
                res.status(404).send(err)
            }
        }
    }
    
})
app.get('/students',detail,async function(req,res){
    let token=req.headers['authorization']
     if(!token){
         res.status(401).send('no token found please provide valid token')
     }
     else{
 
         try{
             let response=await axios.get(baseurl+'/students',{headers:{'Authorization':""+token}})
             console.log('respnse is:',response.data)
             res.send(response.data)
         }
         catch(err){
             if(err.response){
                 let {status,statusText}=err.response
                 console.log('err is:',status,statusText)
                 res.status(status).send(statusText)
             }
             else{
                 res.send(err)
             }
         }
     }
     
 })

 app.get('/students/course/:name',detail,async function(req,res){
    let token=req.headers['authorization']
    let {name}=req.params
     if(!token){
         res.status(401).send('no token found please provide valid token')
     }
     else{
 
         try{
             let response=await axios.get(`${baseurl}/students/course/${name}`,{headers:{'Authorization':""+token}})
             console.log('respnse is:',response.data)
             res.send(response.data)
         }
         catch(err){
             if(err.response){
                 let {status,statusText}=err.response
                 console.log('err is:',status,statusText)
                 res.status(status).send(statusText)
             }
             else{
                 res.send(err)
             }
         }
     }
     
 })
 app.post('/students',detail,async function(req,res){
    let token=req.headers['authorization']
    let {body}=req
    let {name}=req.params
     if(!token){
         res.status(401).send('no token found please provide valid token')
     }
     else{
 
         try{
             let response=await axios.post(`${baseurl}/students`,body,{headers:{'Authorization':""+token}})
             console.log('respnse is:',response.data)
             res.send(response.data)
         }
         catch(err){
             if(err.response){
                 let {status,statusText}=err.response
                 console.log('err is:',status,statusText)
                 res.status(status).send(statusText)
             }
             else{
                 res.status(404).send(err)
             }
         }
     }
     
 })
 app.put('/students/:id',detail,async function(req,res){
    let token=req.headers['authorization']
    let {body}=req
    let {id}=req.params
    let {name}=req.params
     if(!token){
         res.status(401).send('no token found please provide valid token')
     }
     else{
 
         try{
             let response=await axios.put(`${baseurl}/students/${id}`,body,{headers:{'Authorization':""+token}})
             console.log('respnse is:',response.data)
             res.send(response.data)
         }
         catch(err){
             if(err.response){
                 let {status,statusText}=err.response
                 console.log('err is:',status,statusText)
                 res.status(status).send(statusText)
             }
             else{
                 res.send(err)
             }
         }
     }
     
 })
 app.delete('/students/:id',detail,async function(req,res){
    let token=req.headers['authorization']
  
    let {id}=req.params
    let {name}=req.params
     if(!token){
         res.status(401).send('no token found please provide valid token')
     }
     else{
 
         try{
             let response=await axios.delete(`${baseurl}/students/${id}`,{headers:{'Authorization':""+token}})
             console.log('respnse is:',response.data)
             res.send(response.data)
         }
         catch(err){
             if(err.response){
                 let {status,statusText}=err.response
                 console.log('err is:',status,statusText)
                 res.status(status).send(statusText)
             }
             else{
                 res.send(err)
             }
         }
     }
     
 })
 
 app.get('/allrequest',function(req,res){

    fs.promises.readFile(filename,'utf-8')
    .then((result)=>{
      let arr=JSON.parse(result)
      res.send(arr)

    })
 })
 app.get('/allrequest/:method',function(req,res){
     let {method}=req.params
     fs.promises.readFile(filename,'utf-8')
    .then((result)=>{
      let arr=JSON.parse(result)
      let filarr=arr.filter(elem=>elem.method==method)
      res.send(filarr)

    })
 })
 