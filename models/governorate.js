const mongoose=require('mongoose');
const schema=mongoose.Schema;


//schema
var picSchema = new schema({
    img: { data: Buffer, contentType: String }
});

const place=new schema({
    location:String,
    picture:picSchema,
    information:String
});

const governorateSchema=new schema({
    name:String,
    govInformation:String,
    govPicture:picSchema,
    postalcode:Number,
    touristPlaces:[place]
});

// maodel
const governorate=mongoose.model('governorates',governorateSchema);

module.exports=governorate;
