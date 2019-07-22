const mongoose=require('mongoose');
const schema=mongoose.Schema;

// Schema
const userInfo =new schema({
    name:String,
    nationality:String,
    phone:String,
    dateOfBirth:Date,
    userName: {type: String, unique: true ,required:true},
    password: String,
    myToursID:[String]
});

// model
const user=mongoose.model('users',userInfo);

module.exports=user;