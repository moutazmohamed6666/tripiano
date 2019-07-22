const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema

const groupSchame=new schema({
    userID:[String],
    StartDate:Date,
    endDate:Date,
    pricePerPerson:Number,
    availableNumber:Number,
    addressOfMeeting:String
});
// price for praivate group
const priceForprivateGroup=new schema({
    price:Number,
    visitors:Number
});


const individualSchema=new schema({
    userID:String,
    StartDate:Date,
    endDate:Date,
    tourNumber:[priceForprivateGroup],
    addressOfMeeting:String
});

const EvaluationSchame=new schema({
    userID:String,
    numberOfStars:Number,
    comment:String
});

const tourInfo=new schema({
    companyID:String,
    name:String,
    description:String,
    included:String,
    nonIncluded:String,
    evaluation:EvaluationSchame,
    group:[groupSchame],
    individual:[individualSchema]
});


const tour=mongoose.model("tours",tourInfo);

module.exports=tour;