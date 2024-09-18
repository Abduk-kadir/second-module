const mongoose = require("mongoose")

const LibrarySchema = new mongoose.Schema({
    name:{type:String},
    author:{type:String},
    pages:{type:String}
})

const LibraryModel = mongoose.model("books",LibrarySchema)
module.exports=LibraryModel