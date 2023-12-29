const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:Number,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Confirm_Password:{
        type:String,
        required:true
    }

})

const Register = new mongoose.model("Register",employeeSchema);

module.exports=Register;