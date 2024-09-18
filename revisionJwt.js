let express=require("express")
let app=express()
let Jwt=require('jsonwebtoken')
let passport=require('passport')
let JwtStragtey=require('passport-jwt').Strategy
let ExtractJWt=require('passport-jwt').ExtractJwt
let {users,orders}=require('./data2.js')

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
const params={
   
    jwtFromRequest:ExtractJWt.fromAuthHeaderAsBearerToken() ,
    secretOrKey:'secretkey4t6747' 
}

let expiryTime=60          
let StrategyAll=new JwtStragtey(params,function(token,done){
    console.log('stategyall')
    console.log(token)
    let user=users.find(elem=>elem.id==token.id)
    if(!user){
        return done(null,false,{message:'username and password are not correct'})
    }
    else{
        return done(null,user)
    }


})


let Strategyadmin=new JwtStragtey(params,function(token,done){
    console.log('stategyadmin')
    console.log(token)
    let user=users.find(elem=>elem.id==token.id)
    console.log('user=',user)
    if(!user){
        return done(null,false,{message:'username and password are not correct'})
    }
    else if(user.role!='admin'){
        return done(null,false,{message:'role should be admin'})
    }
    else{
        return done(null,user)
    }

})
passport.use('roleall',StrategyAll)
passport.use('roleadmin',Strategyadmin)

app.post('/user',function(req,res){
    let {body}=req
    let {username,password}=body
    let user=users.find(elem=>elem.name==username&&elem.password==password)
    console.log('user is',user)
    if(user){
       let payload={id:user.id}
       token=Jwt.sign(payload,params.secretOrKey,{
        algorithm:"HS256",
        expiresIn:300
       })
       res.send({
        token:'bearer '+token
       })
    }
    else{
        res.sendStatus(401)
    }
})
app.get('/myorders',passport.authenticate('roleall',{session:false}),function(req,res){
    console.log('/inmyorders')
    console.log(req.user)
   let order1=orders.filter(ord=>ord.userId==req.user.id)
   res.send(order1)

})
app.get('/allorders',passport.authenticate('roleadmin',{session:false}),function(req,res){
   console.log('/all order')
   console.log(req.user)
   res.send(orders)

})

