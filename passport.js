let express=require("express")
let passport=require("passport")
let LocalStrategy=require("passport-local").Strategy
let {users,orders}=require('./data2.js')
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
app.use(passport.initialize())
const port=2410
app.listen(port,()=>console.log(`Node app is listinng${port}`))
let strategyAll=new LocalStrategy(function(username,password,done){
    console.log('in local stragty',username,password)
    let user1=users.find(elem=>elem.name==username&&elem.password==password)
    if(!user1){
       return done(null,false,{message:"incorrect username and password"})
    }
    else{
       return done(null,user1)
    }

})
let strategyadmin=new LocalStrategy(function(username,password,done){
    console.log('in local stragty',username,password)
    let user1=users.find(elem=>elem.name==username&&elem.password==password)
    if(!user1){
       return done(null,false,{message:"incorrect username and password"})
    }
    else if(user1.role!='admin'){
        return  done(null,false,{message:'you do not admin role'})
    }
    else{
       return done(null,user1)
    }

})
passport.use('roleAll',strategyAll)
passport.use('roleAdmin',strategyadmin)
app.post('/user',function(req,res){
    let {username,password}=req.body;
    let user=users.find(elem=>elem.name==username&&elem.password==password)
    if(user){
        let payload={id:user.id}
      res.send(payload)
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


