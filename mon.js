const {bookModel}=require('./moncon.js')

/*const savedb=async ()=>{
    
    let book= new bookModel({name:"math",price:500,page:4})
    let result=await book.save()
    console.log(result)

}

const  updatedb=async()=>{
    const bookModel=mongoose.model('books',bookSchema)
    try{
     await bookModel.updateOne(
        {name:'data science'},
        {$set:{name:"data anaylis"}}
    )
    console.log('data is updata')
    }
    catch(err){
     console.log(err)
    }
  
}
const  deletdb=()=>{
    const bookModel=mongoose.model('books',bookSchema)
    bookModel.deleteOne({name:'data anaylis'})
    .then((result)=>console.log(result))      
     
}
*/
const  showdb=()=>{
   // const bookModel=mongoose.model('books',bookSchema)
    bookModel.find()
    .then((result)=>console.log(result))      
     
}


//deletdb()
showdb()
//updatedb()

//savedb()