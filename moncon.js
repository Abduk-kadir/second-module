const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
    name:String,
    price:Number,
    page:Number
 })
 const bookModel=mongoose.model('books',bookSchema) 
 module.exports.bookModel=bookModel