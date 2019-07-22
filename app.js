const express=require('express');
const mongoose=require('mongoose');
const  app = express();
const bodyParser=require('body-parser');

// promises
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/Tripiano',{useNewUrlParser: true });
mongoose.connection.once('open',function(){
    console.log('connection has been made');
}).on('error',function(err){
console.log('connection Error : '+err);
});
app.use(bodyParser.json());
app.use('/companies',require('./routes/companyAdmin'));
app.use('/companyTours',require('./routes/companyTours'));
app.listen(3000,()=>{console.log(`listenning 3000`)});