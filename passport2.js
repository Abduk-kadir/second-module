let express=require("express")
let cookieParser=require("cookie-parser")
let passport=require('passport')
let {users,orders}=require('./data2.js')
let CookieStrategy=require("passport-cookie").Strategy
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
app.use(cookieParser())
app.use(passport.initialize())
const port=2410
app.listen(port,()=>console.log(`Node app is listinng${port}`))
let mycookie='passportcookie'
let strategyAll=new CookieStrategy({cookiename:mycookie},function(token,done){
    console.log('in cookie stragty all',token)
    let user=users.find(elem=>elem.id==token.id)
    if(!user){
       return done(null,false,{message:"incorrect username and password"})
    }
    else{
       return done(null,user)
    }

})
let strategyAdmin=new CookieStrategy({cookiename:mycookie},function(token,done){
    console.log('in cookie stragty admin',token)
    let user=users.find(elem=>elem.id==token.id)
    if(!user){
       return done(null,false,{message:"incorrect username and password"})
    }
    else if(user.role!='admin'){
        return done(null,false,{message:"you do not have admin role"})
    }
    else{
       return done(null,user)
    }

})
passport.use('roleAll',strategyAll)
passport.use('roleAdmin',strategyAdmin)
app.post('/user',function(req,res){
    let {username,password}=req.body;
    console.log('anah')
    let user=users.find(elem=>elem.name==username&&elem.password==password)
    if(user){
        res.cookie(mycookie,user)
        res.send('login succesfull')
    }
    else{
        res.sendStatus(401)
    }
})
app.get('/user',passport.authenticate('roleAll',{session:false}),function(req,res){
    console.log('in Get /Users',req.user)
    res.send(req.user)
})
app.get('/myorders',passport.authenticate('roleAll',{session:false}),function(req,res){
    console.log('in Get /myorders',req.user)
    let orders1=orders.filter(elem=>elem.userId==req.user.id)
    res.send(orders1)
})
app.get('/allorders',passport.authenticate('roleAdmin',{session:false}),function(req,res){
    console.log('in Get /allOrders')
    res.send(orders)
})