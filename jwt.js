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
//app.use('/myorders',authenticateToken)
const port=2410
app.listen(port,()=>console.log(`Node app is listinng${port}`))

let {users,orders}=require('./data2.js')
const jwt=require('jsonwebtoken')
const jwtKey='secrectkey9140196641'
const jwtExpiryTime=300
const cookieParser=require('cookie-parser')
app.use(cookieParser())
app.use('/myorders',authenticateToken)
let cookieName='jwtToken'

function authenticateToken(req,res,next){
   // let token=req.headers['authorization'] this is for jwt
   let token=req.cookies[cookieName]//this is for jwt with cookie
    if(!token){
        res.status(401).send('please login') 
    }
    else{
       jwt.verify(token,jwtKey,function(err,data){
        if(err){
            res.status(403).send(err)
        }
        else{
            console.log(data)
            req.user=data.user
            next()
        }
       })
    }
    
}

app.post('/login',function(req,res){
    let {body}=req;
    let {username,password}=body
    let user=users.find(elem=>elem.name==username&&elem.password==password)
    if(user){
      let token= jwt.sign({ user },jwtKey,{
            algorithm:"HS256",
            expiresIn:jwtExpiryTime
        });
        res.cookie(cookieName,token)//this.is for jwt with cookie
        res.send('login successfull')//this is for jwt with cookie
       // res.send(token) this.is for jwt
    }
    else{
        res.status(401).send('login failed')
    }

})
app.get('/myorders',function(req,res){
            console.log('inget')
            let order1=orders.filter(ord=>ord.userId==req.user.id)
            res.send(order1)
    
})
app.get('/info',function(req,res){
    res.send('Hello Welcome to Tutorial')
})