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

let connData={
    host:"localhost",
    user:"root",
    password:"1994",
    database:"testDb"
}
let connection=mysql.createConnection(connData)

app.post('/login',function(req,res){
    let {body}=req;
    let {email,password}=body
    let cus=customers.find(elem=>elem.email==email&&elem.password==password)
    if(cus){
       res.send({name:cus.name,email:email,role:cus.role})
    }
    else{
        res.status(500).send('Login Failed please provide correct email or password')
    }
})

app.post('/register',function(req,res){
    let {body}=req;
    let {name,email,password,role}=body
    if(role=='admin'||role=='Admin'){
        res.status(400).send('user can not register wiht role admin')
    }
    else{
        
                let f=customers.find(elem=>elem.email==email)
                if(f){
                    res.status(400).send('this.email is already register')
                }
                else{
                  let maxId=customers.reduce((acc,curr)=>curr.custId>acc?curr.custId:acc,0)  
                  maxId=maxId+1
                  let js={custId:maxId,name:name,email:email,password:password,role:role}
                  customers.push(js)
                  if(role=='student')
                  {
                  let id=students.reduce((acc,curr)=>curr.id>acc?curr.id:acc,0)
                  id=id+1
                  students.unshift({id:id,name:name,dob:'',gender:'',about:'',courses:[]})
                  console.log(students)
                  }
                  else{
                    let id=faculties.reduce((acc,curr)=>curr.id>acc?curr.id:acc,0)
                    id=id+1
                    faculties.unshift({id:id,name:name,courses:[]})
                    console.log(faculties)

                  }
                 
                
                  res.send({name:name,email:email,role:role})
                }

    }

})
app.get('/getfacultyname',function(req,res){
   
    res.send(faculties.map(elem=>elem.name));

})

app.get('/getstudentname',function(req,res){
   
    res.send(students.map(elem=>elem.name))

})



app.get('/getStudents',function(req,res){
    let limit=3;
    let {page=1,course}=req.query
    page=+page
    let coursearr=course?course.split(','):[]
     let newstudents=students.filter(elem=>{
        let fin=elem.courses.find(val=>{ 
             let c=coursearr.find(v=>v==val)
             return c
        })
        return fin

    }) 
    newstudents=course?newstudents:students
    console.log(newstudents)
    let arr =pagination(newstudents,page)
    res.send({items:arr,page:page,totalItems:arr.length,totalNums:newstudents.length})
  
    
})
app.get('/getCourses',function(req,res){

    res.send(courses)

})
app.put('/putCourse',function(req,res){
  let {body}=req
  let {courseId,name}=body
  let {value}=req.query
  
 
  let index=courses.findIndex(elem=>elem.courseId==courseId);
  if(index>-1){
    if(value=='student')
    for(let i=0;i<body.students.length;i++){
       
        let ind=students.findIndex(val=>val.name==body.students[i])
        students[ind].courses.push(name)
        
      }
      else{
      for(let i=0;i<body.faculty.length;i++){
        let ind=faculties.findIndex(val=>val.name==body.faculty[i])
        faculties[ind].courses.push(name)
        console.log(faculties[ind])
      } 
    }
    
     courses[index]=body
     res.send(body)
  }
  else{
    res.send('no courses for found for editing course')
  }
})
app.get('/faculty',function(req,res){
    let {page=1,course}=req.query
    page=+page
    let coursearr=course?course.split(','):[]
   let faculty=faculties.filter(elem=>{
        let fin=elem.courses.find(val=>{ 
             let c=coursearr.find(v=>v==val)
             return c
        })
        return fin

    }) 
    faculty=course?faculty:faculties
    let arr =pagination(faculty,page)
    res.send({faculty:arr,page:page,totalItems:arr.length,totalNums:faculty.length})
   
})
function pagination(faculty,page){
    let limit=3;
    let startindex=(page-1)*3
    let endindex=startindex+limit
    let newarr=faculty.slice(startindex,endindex)
    return newarr

}
//api for student
app.get('/getStudentCourse/:name',function(req,res){
   
    let {name}=req.params;
  
    let f=students.find(elem=>elem.name==name)

    console.log(f)
    filtarr=courses.filter(elem=>f.courses.find(val=>val==elem.name))
   res.send(filtarr)


})
app.get('/getStudentClass/:name',function(req,res){
   
    let {name}=req.params;
    let f=students.find(elem=>elem.name==name)
    let filtarr=classes.filter(elem=>f.courses.find(val=>val==elem.course))
    console.log(filtarr)
    console.log(f)
    res.send(filtarr)

})
app.get('/getStudentDetails/:name',function(req,res){
    let {name}=req.params;
    let f=students.find(elem=>elem.name==name)
    let {id,dob,gender,about}=f
    res.send({id:id,name:f.name,dob:dob,gender:gender,about:about})
})
app.post('/postStudentDetail',function(req,res){
    let {body}=req
    let {name,dob,gender,about}=body
    let index=students.findIndex(elem=>elem.name==name)
    let student=students[index]
    let obj={id:student.id,name:name,dob:dob,gender:gender,about:about,courses:[]}
    students[index]=obj
    res.send(obj)
})

app.get('/getFacultyCourse/:name',function(req,res){
    let {name}=req.params;
    let fac=faculties.find(elem=>elem.name==name)
    let coursearr=courses.filter(elem=>fac.courses.find(val=>val==elem.name))
    console.log(fac)
    res.send(coursearr)
})

app.get('/getFacultyClass/:name',function(req,res){
    let {name}=req.params;
    let classarr=classes.filter(elem=>elem.facultyName==name)
    console.log(classarr)
   
    res.send(classarr)
    
})

app.post('/postClass',function(req,res){
    let {body}=req
    let maxid=classes.reduce((acc,curr)=>curr.classId>acc?curr.classId:acc,0)
    maxid+=1
    let obj={...body,classId:maxid}
    classes.push(obj)
    console.log(classes)
    res.send(obj)
})
app.put('/postClass/:id',function(req,res){
    let {body}=req
    let {id}=req.params
    id=+id
    let index=classes.findIndex(elem=>elem.classId==id)
    
    if(index>-1){
        console.log(classes)
        classes[index]={...body,classId:id}
        console.log(classes)
        res.send({...body,classId:id})
    }
    else{
        res.status(404).send('no classes found for editing')
    }
})
app.get('/getAClass/:id',function(req,res){
    let {id}=req.params
    let f=classes.find(elem=>elem.classId==id)
    res.send({course:f.course,time:f.time,endTime:f.endTime,topic:f.topic})
})



