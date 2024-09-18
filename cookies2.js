let express=require("express")
let mysql=require('mysql')
let {users,laptops,mobiles,offers}=require('./data2.js')
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

app.get('/mobiles',function(req,res){
    let userdata=req.signedCookies.userdata
    console.log('user data is:',JSON.stringify(userdata))
    
    if(!userdata)
    {
        userdata={name:"guest",pages:[]}
    }
    userdata.pages.push({url:'/mobiles',date:Date.now()})
    res.cookie("userdata",userdata,{maxAge:30000,signed:true})
    res.send(mobiles)
  //let userdata=req.signedCookies.userdata
  //console.log(`userdata:${JSON.stringify(userdata)}`)
  //if(!userdata) userdata={user:"guest",pages:[]} 
  //userdata.pages.push({url:'/mobiles',date:Date.now()})
 // res.cookie("userdata",userdata,{maxAge:30000,signed:true})
  //res.send(mobiles)
})
app.get('/laptops',function(req,res){
    let userdata=req.signedCookies.userdata
    console.log(`userdata:${JSON.stringify(userdata)}`)
    if(!userdata) userdata={user:"guest",pages:[]} 
    userdata.pages.push({url:'/laptops',date:Date.now()})
    res.cookie("userdata",userdata,{maxAge:30000,signed:true})
    res.send(laptops)
})
app.post('/login',function(req,res){
    let {body}=req;
    let {name,password}=body;
    let f=users.find(elem=>elem.name==name&&elem.password==password)
    if(!f){
        res.status(401).send('login Failed')
    }
    else{
        res.cookie("userdata",{user:name,pages:[]},{maxAge:30000,signed:true})
        res.send('succesful login')
    }
})
app.get('/logout',function(req,res){
    res.clearCookie("userdata")
    res.send('clear cookie')
})
app.get('/cookieData',function(req,res){
    let userdata=req.signedCookies.userdata;
    res.send(userdata)
})
app.get('/users',function(req,res){
    let {userdata={}}=req.signedCookies;
    let {user}=userdata
    if(!user||user=='guest'){
        res.status(401).send('no access please login first')
    }
    else{
        let f=users.find(elem=>elem.name==user)
        if(f.role=='admin')
        {
            res.send(users)
        }
        else{
            res.status(403).send('forbidden')
        }
    }
})