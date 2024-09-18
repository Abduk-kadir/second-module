let fs=require('fs')
let readline=require('readline-sync');


 console.log('arman')
 let fun=async()=>{
   try{
  let result=await fs.promises.readFile('hell1.txt')
  console.log(result)
 }
 catch(err){
    
 }
 }
 fun()
 console.log('abdul')

/*async function  readFile(){
   // console.log('readinig file')
  try{
    
    let data=await fs.promises.readFile('cut.txt','utf-8')
    console.log(data)
  }
  catch(err){
   console.log(err.path)
  }
}
console.log('arman')
*/
/*async function writeFile(){
    console.log('writing file')
    try{
        await fs.promises.writeFile(filename,'amrn khan')
        console.log('file is written is successfully')
    }
    catch(err){
        console.log(err)
    }
}
async function appendFile(){
    console.log('appending file')
    try{
        await fs.promises.appendFile(filename,' new data is kadir')
        console.log('data is appended')
    }
    catch(err){
        console.log(err)
    }
}
async function getStat(){
    try{
    let status=await fs.promises.stat(filename)
    console.log(status)
    }
    catch(err){
        console.log('error is:',err)
    }
    
}
async function getAccess(){
    try{
     await fs.promises.access(filename)
     console.log('file is exist')
    }
    catch(err){
        console.log('file does not exist')
    }
}

 readFile()
 appendFile()
 readFile()
 writeFile()
 readFile()

 //writeFile()
 //getStat()
 //getAccess()
 //appendFile()
 
let text=readline.question('enter text')
async function axer(filname,data){
    try{
      await fs.promises.appendFile(filename,data)
      let result =await fs.promises.readFile(filename,'utf-8')
      console.log(result)
    
    }
    catch(err){
        console.log('err is:',err)
    }
}

let filename=readline.question('enter filename')
let text=readline.question('enter text ')
async function axer(filename,text){
    try{ 
        await fs.promises.access(filename)
        try{
        let result =await fs.promises.readFile(filename,'utf8')
        console.log(result)
        await fs.promises.appendFile(filename,text)
        let result2=await fs.promises.readFile(filename,'utf-8')
        console.log(result2)
        }
        catch(err){
            console.log(err)
        }
     }
    catch(err){
        await fs.promises.writeFile(filename,text)
        console.log('data is written in new file successfully')
        let result=fs.promises.readFile(filename,'utf-8')
        console.log(result)
    }
}


axer(filename,text) 

let filename='course.txt'
let courseData={
   course:"Node.js",
   students:[
      {name:'abdul',age:24},
      {name:'rahul',age:24},
      {name:'traymbak',age:26}
   ]
}

async function writeJsonData(){
    let strdata=JSON.stringify(courseData)
    try{
    await fs.promises.writeFile(filename,strdata)
    console.log(' data is written is successfull')
    }
    catch(err){
        console.log(err)
    }
}
async function enrollNewStudent(){
    try{
    let result=await fs.promises.readFile(filename,'utf-8')
    let json=JSON.parse(result)
    let name=readline.question('enter name');
    let age= +readline.question('enter age')
    let st={name:name,age:age}
    json.students.push(st)
    let data=JSON.stringify(json)
    await fs.promises.writeFile(filename,data)
    console.log('new student is enroll successfull')

    }
    catch(err){
        console.log(err)
    }
}
async function readjsonData(){
    let result=await fs.promises.readFile(filename,'utf-8')
    let json=JSON.parse(result)
    console.log(json)
}
let option =readline.question('enter option 1,for writing json, 2,for reading ,3 for enroll new stuent')
switch(+option){
    case 1:
        writeJsonData();
        break;
    case 2:
        readjsonData();
        break;
        
    case 3:
        enrollNewStudent() 
        break;   
}
*/
/*let filename='hello.txt'
let data= [{x:2,y:3}, {x:-4,y:10}, {x:0,y:0}, {x:6,y:-1}]
async function writeData(){
    let str=JSON.stringify(data)
    try
    {
    await fs.promises.writeFile(filename,str)
    console.log('data is written successfully')
    }
    catch(err){
        console.log(err)
    }
    
}
async function readData(){ 
    try
    {
     let result=await fs.promises.readFile(filename,'utf-8')
     console.log(JSON.parse(result))
    }
    catch(err){
        console.log(err)
    }
    
}

async function add(){
    try{
    let x=readline.question('enter x')
    let y=readline.question('enter y')   
    let result=await fs.promises.readFile(filename,'utf-8')
    let obj=JSON.parse(result)
    obj.push({x:x,y:y})
    console.log('obj is:',obj)
    await fs.promises.writeFile(filename,JSON.stringify(obj))
    console.log('point is successfully added')
    }
    catch(err){
        console.log(err)
    }

}


let option =readline.question('enter option');
switch(option){
    case 'create'||'reset':
       writeData()
        break;
    case 'read':
        readData()   
        break;
    case 'add':
        add()  
        break;
    
}*/
//readFile()
/*let filename='course.txt'
function newFun(){
    fs.readFile(filename,(err,data)=>{
       if(err){
          console.log('is error')
       }
       else{
         console.log('not error')
         // let result=JSON.parse(data)
          console.log(JSON.parse(data))
       }
    })
  }
//newFun()
*/