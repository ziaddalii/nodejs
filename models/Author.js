const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim:true,
        minLength:3,
        maxLength:200,
    },
    lastName:{
        type:String,
        required: true,
        trim:true,
        minLength:3,
        maxLength:200,
    },
    nationality:{
        type:String,
        required: true,
        trim:true,
        minLength:2,
        maxLength:100,
    },
    image:{
        type:String,
        default: "default-image.png",
    },
}, {
    timestamps:true,
});

const Author = mongoose.model("Author", AuthorSchema)

module.exports={
    Author
}