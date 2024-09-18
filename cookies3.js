let express=require("express")
let mysql=require('mysql')
let {employee}=require('./data3.js')
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

app.post('/login',function(req,res){
    let {body}=req;
    let {empcode,name}=body
    console.log(empcode,name)
    let emp=employee.find(elem=>elem.empCode==empcode&&elem.name==name)
    if(!emp){

        res.status(401).send('login failed')
    }
    else{
        res.cookie("empcode",empcode,{maxAge:400000,signed:true})
        res.cookie("tracker",[{name:emp.name,url:'/login',date:Date.now()}],{maxAge:400000,signed:true})
        res.send('successful login')
    }


})
app.get('/logout',function(req,res){
    res.clearCookie("empcode")
    res.clearCookie("tracker")
    res.send('clear cookie')
})
app.get('/myDetail',function(req,res){
    let empcode=req.signedCookies.empcode
    let {tracker=[]}=req.signedCookies
    let js={}
    !empcode ?js.name='guest': js.name=tracker[0].name 
   
    js.url='/myDetail'
    js.date=Date.now()
    tracker.push(js)
    res.cookie('tracker',tracker,{maxAge:400000,signed:true})
    if(empcode){
       let emp=employee.find(elem=>elem.empCode==empcode) 
       res.send(emp)
    }
    else{
        res.status(401).send('login first')
    }
})
app.get('/company',function(req,res){
    let {tracker=[]}=req.signedCookies
    let empcode=req.signedCookies.empcode
    let js={}
    !empcode ?js.name='guest': js.name=tracker[0].name 
    js.url='/company'
    js.date=Date.now()
    tracker.push(js)
    res.cookie('tracker',tracker,{maxAge:400000,signed:true})

    res.send('welcome to Employee portal of  MilestoneOs company')

})
app.get('/myJuniors',function(req,res){
    let empcode=req.signedCookies.empcode
    let {tracker=[]}=req.signedCookies
    console.log('arris:',tracker)
    let js={}
    !empcode ?js.name='guest': js.name=tracker[0].name 
    js.url='/myJuniors'
    js.date=Date.now()
    tracker.push(js)
    res.cookie('tracker',tracker,{maxAge:400000,signed:true})

    let fillarr=[]
    if(empcode){
        let emp=employee.find(elem=>elem.empCode==empcode)
        console.log(emp.designation)
        switch(emp.designation){
          
            case "VP":
               fillarr=employee.filter(elem=>elem.designation=='Manager'||elem.designation=='Trainee') 
            
               break; 
            case "Manager":
                fillarr=employee.filter(elem=>elem.designation=='Trainee') 
                break;
            case "Trainee":
                fillarr=[]
                break;

        }
        res.send(fillarr)
    }
    else{
        res.status(401).send('login first')
    }

})

app.get('/getTracker',function(req,res){
    res.send(req.signedCookies.tracker)
})