const fs=require('fs');
const {json}=require('express')

let filename='hello1.txt'
fs.readFile(filename,'utf8',(err,result)=>{
    if(err){
        console.log('error is occur')
    }
    else{
      
        console.log(result)
    }
})
fs.appendFile(filename,'village is kaulachak',(err)=>{
    if(err){
        console.log('error is occur')
    }
    else{
      
        console.log('file is written successfully')
    }
})
console.log('rahulbhai')
