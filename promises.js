const { json } = require('express')
let fs=require('fs')
//let filename='hello.txt'
let readline=require('readline-sync')
 /*function getStat(){
  console.log('stat',filename)  
 fs.promises.stat(filename)
.then((content)=>console.log(content))
.catch((err)=>console.log('err is:',err))
 }

 function checkAccess(){
    console.log('checkaccess',filename)
    fs.promises.access(filename)
    .then(()=>console.log('file exit'))
    .catch(()=>console.log('file does not exit'))
 }
 function readFile(){
    console.log('readingfile',filename)
    fs.promises.readFile(filename,'utf-8')
    .then((content)=>console.log(content))
    .catch((err)=>console.log('err is',err))
 }
 function writeFile(){
    console.log('writinfile',filename)
    let data='my son is arham'
    console.log('writiningfile',filename)
    fs.promises.writeFile(filename,data)
    .then(()=>console.log('file is written'))
    .catch((err)=>console.log('err is',err))
 }
 function appendFile(){
    console.log('appending',filename)
    fs.promises.appendFile(filename,'and i am arman')
    .then(()=>console.log('data is succesfully apend'))
    .catch((err)=>console.log(err))
 }

// getStat()
//checkAccess()
readFile()
writeFile()
readFile();
appendFile();
readFile()
//appendFile()




let text=readline.question('enter text')
let filename=readline.question('enter file name')

fs.promises.access(filename)
.then(()=>
   fs.promises.readFile(filename,'utf8').then((result)=>{
     console.log(result);
     fs.promises.appendFile(filename,text).then(()=>
     {
        console.log('successfully appended')
        fs.promises.readFile('tum.txt','utf-8')
        .then((content)=>console.log(content))
       
     })
   }
   ) 
 

)
.catch((err)=>{
   console.log('in error section')
   fs.promises.writeFile(filename,text)
   .then(()=>{
      console.log('file is written successfully')
      fs.promises.readFile(filename,'utf-8')

      .then((result)=>console.log(result))
   })
 }
)
*/
let filename='course.txt'
let courseData={
   course:"math",
   students:[
      {name:'fatima',age:24},
      {name:'jeenat',age:24},
      {name:'firdosh',age:26}
   ]
}



function writejson(){
   let str=JSON.stringify(courseData)
   fs.promises.writeFile(filename,str)
   .then(()=>console.log('data is written successfully'))
   .catch((err)=>console.log(err))
}

/*function enrollNewStudent(){
   let name=readline.question('enter name of student')
   let age=readline.question('enter age')
   let obj={name:name,age:age}
   fs.promises.readFile(filename,'utf-8')
   .then((result)=>{
     console.log('read successfully')
     let course=JSON.parse(result)
     course.students.push(obj)
     let data=JSON.stringify(course)
     fs.promises.writeFile(filename,data)
     .then(()=> console.log('student is written succesfully'))
     .catch((error)=>console.log('error is:',err))

   })
   .catch((err)=>console.log('err:',err))

}

function readjsonData(){
   fs.promises.readFile(filename,'utf-8')
   .then((result)=>{
      data=JSON.parse(result)
      console.log(data)
   })
   .catch((err)=>console.log(err))
}*/

   
newWrite()

//writejson()
//readjsonData()
//enrollNewStudent()
