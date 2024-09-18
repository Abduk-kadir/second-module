let mysql=require('mysql')
let {customers}=require('./data.js')
let connectionData=
    {
        host:"localhost",
        user:"root",
        password:"1994",
        database:"testDb"
    }

 let connection=mysql.createConnection(connectionData)
  function insertData(){
     let sql='insert into customers(name,password,role,email) values ?'
     let arr=customers.map(elem=>[elem.name,elem.password,elem.role,elem.email])
     console.log(arr)
     connection.query(sql,[arr],function(err,result){
        if(err){
            console.log('error is:',err)
        }
        else{
            console.log('result is:',result)
        }
     })
  
  }
  insertData()