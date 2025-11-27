// 1. Employee Model (Mongoose Schema)

// File: models/Employee.js

// ✅ Purpose:

// Defines the structure of data stored in MongoDB.

// ⭐ Key Concepts:

// Schema = Blueprint of a document

// Model = Interface to interact with the collection

// mongoose.Schema() = Used to define fields and types
//  ⭐ Why needed?

// Because MongoDB is schema-less, but Mongoose provides structure, validation, and safety.

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required: true,
    },
    age:{
type:Number,
required:true,
    },
    city:{
        type:String,
        required:false,
    }

});
module.exports = mongoose.model('Employee',employeeSchema)