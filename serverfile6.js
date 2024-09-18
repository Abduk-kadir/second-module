let express=require("express")
let app=express()
let Jwt=require('jsonwebtoken')
let passport=require('passport')
let JwtStragtey=require('passport-jwt').Strategy
let ExtractJWt=require('passport-jwt').ExtractJwt
let {employee}=require('./data3.js')
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"

    );
    res.header("Access-Control-Expose-Headers","Authorization,X-Auth-Token")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With ,Content-Type, Accept,Authorization"

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
let expiryTime=200;
let StrategyEmp=new JwtStragtey(params,function(token,done){
    console.log('InStragety')
    console.log('token is',token)
    let emp=employee.find(elem=>elem.empCode==token.empCode)
   if(!emp){
    return done(null,false,{message:'username and password are not correct'})
   }
   else{
    return done(null,emp)
   }
})
passport.use('empStrat',StrategyEmp)
app.post('/user',function(req,res){
    let {body}=req;
    let {empcode,name}=body
    let user=employee.find(elem=>elem.empCode==empcode&&elem.name==name)
    if(!user){
        res.status(401).send('please provide correct empcode and name')
    }
    else{
        let token=Jwt.sign(user,params.secretOrKey,{
            algorithm:'HS256',
            expiresIn:expiryTime
        })
       // res.setHeader('Authorization',token)
         res.setHeader('X-Auth-Token',token)
        res.send(user)

    }
})
app.get('/myDetails',passport.authenticate('empStrat',{session:false}),function(req,res){
    console.log('/myDetails')
    console.log(req.user)
    let emp=employee.find(elem=>elem.empCode==req.user.empCode)
    res.send(emp)
})

app.get('/myJunior',passport.authenticate('empStrat',{session:false}),function(req,res){
    console.log('/myJunior')
    console.log(req.user)
    let fillarr=[]
    switch(req.user.designation){

        case "VP":
          fillarr=  employee.filter(elem=>elem.designation=='Manager'||elem.designation=='Trainee')
        break;
        
        case "Manager":
          fillarr=  employee.filter(elem=>elem.designation=='Trainee')
        break;
        case "Trainee":
            fillarr=[]

    }
    res.send(fillarr)
})

