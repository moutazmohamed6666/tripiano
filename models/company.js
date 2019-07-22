const mongoose=require('mongoose');
const schema=mongoose.Schema;

//schema
var picSchema = new schema({
    img: { data: Buffer, contentType: String }
});

const companySchema=new schema({
    accountName:{type:String,required:true},
    job:{type:String,required:true},
    officialName:{type:String,required:true},
    rollingName:{type:String,required:true},
    address:{type:String,required:true},
    mail:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    companyNumber:Number,
    fax:Number,
    licenceNumber:{type:Number,required:true},
    licencePicture:picSchema,
    BankAccount:{type:String,required:true},
    website:{type:String,required:true},
    postNumber:Number
});

const company=mongoose.model('companies',companySchema);

module.exports=company;

