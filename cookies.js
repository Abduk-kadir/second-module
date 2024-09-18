let express=require("express")
let mysql=require('mysql')
let {customers,students,courses,faculties,classes}=require('./data.js')
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
const cookieParser=require("cookie-parser");
app.use(cookieParser("abcd:1234"))

app.get('/viewPage',function(req,res){
    let name=req.signedCookies.name
    let counter=req.signedCookies.counter
    if(!name){
        res.cookie("name","guest",{maxAge:15000,signed:true})
        res.cookie("counter",1,{maxAge:15000,signed:true})
        res.send("cookie set")

    }
    else{
        res.cookie("counter",+counter+1,{signed:true})
        res.send( `cookie recieved is=${name} and updated counter is${+counter+1}`)

    }

   /* if(!name){
        res.cookie("name","Guest",{maxAge:10000})
        res.cookie("counter",1,{maxAge:10000})
        res.send("Coookie set")
    }
    else{
        res.cookie("counter",+counter+1)
        res.send(`cookie recieved for name:${name} and counter ${counter}`)
    }*/

})
app.post('/viewPage',function(req,res){
   
    let name=req.body.name;
    res.cookie("name",name,{maxAge:15000,signed:true})
    res.cookie("counter",1,{maxAge:15000,signed:true})
    res.send(`cookie set with name=${name}`)
   
   //res.cookie("name",name,{maxAge:10000})
  // res.cookie("counter",1,{maxAge:10000})
  // res.send(`cookie set with name=${name}`)
})
app.delete('/viewPage',function(req,res){
    res.clearCookie("name")
    res.clearCookie("counter")
    res.send(`deleted cookie`)
})


