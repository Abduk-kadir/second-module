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
app.use(sayHello)
app.use(saybye)
//app.use(showUrlMethod)
//app.use('/orders',showbody)
//app.use(insertUser)
//app.use(saybye)
//app.use(insertArr)
//app.use(inserUrlTable)
let arr=[]
const port=2410
app.listen(port,()=>console.log(`Node app is listinng${port}`))
let connectionData=
    {

        host:"localhost",
        user:"root",
        password:"1994",
        database:"testDb"
    }

let connection=mysql.createConnection(connectionData)

 function inserUrlTable(req,res,next){
    let sql='insert into methods(url,method) values(?,?)'
    let url=req.url
    let met=req.method
    connection.query(sql,[url,met],function(err,response){
        if(err){
          console.log(err)
        }
        else{
          console.log(response)
        }
    })
    next();
 }

function sayHello(req,res,next){
    console.log('middleware is started')
    next()

}
function saybye(req,req,next){
    console.log('Bye: middleware  over')
    next()
}
function showUrlMethod(req,res,next){
   console.log(`url:${req.url} method is${req.method}`)
   next()
}
function showbody(req,res,next){
    console.log(`body is:${JSON.stringify(req.body)}`)
    next()
}
function insertUser(req,res,next){
    req.user={name:"temp",role:"Guest"}
    console.log(`Inserted in req:,${JSON.stringify(req.user)}`)
    next()
}
function insertArr(req,res,next){
    let js={url:req.url,method:req.method}
    console.log(js)
    arr.push(js)
    req.value=arr
    next()
}

app.get('/products',function(req,res){
    res.send(students)
   // console.log('in the route Get:/products')
    //res.send({route:'/products',user:req.user})
})
app.get('/orders',function(req,res){
    console.log('in the route Get:/orders')
    res.send({route:'/orders',user:req.user})
})

app.post('/orders',function(req,res){
    console.log('in the route Post:/orders')
    res.send({route:'/orders',body:req.body,user:req.user})
})
app.get('/allRequest',function(req,res){
    let sql='select * from methods'
    connection.query(sql,function(err,respnse){
        if(err){
            res.send(err)
        }
        else{
            res.send(respnse)
        }
    })
})


