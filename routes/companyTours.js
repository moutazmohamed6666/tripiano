const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser');
const jwt=require('jsonwebtoken');
var Tour=require('../models/tour');
const checkAuth=require('../middleware/check-auth');

// create tour 
router.post('/createTour',checkAuth,function(req,res){
const tour=new Tour({
    companyID:req.authData.companyID,   
    name:req.body.name,
    description:req.body.description,
    included:req.body.included,
    nonIncluded:req.body.nonIncluded,
    group:req.body.group,
    individual:{
        tourNumber:req.body.individual.tourNumber  // 1-price   2-number of visitor 
    }
});

tour.save().then(result=>{
    res.status(201).json({
        massege:'Tour is created'
    });
}).catch(err=>{
    res.status(500).json({
        error:err
    });
});
});

// retrieve company tours   
router.get('/Tours',checkAuth,function(req,res){
Tour.find({companyID:req.authData.companyID},(function(err,result){
    console.log(result ,result.length );
    if(err)
    {
      res.status(500).json({
            error:err
        });
    }
    if(result.length<1)
    {
        res.status(404).json({
            massege:'This company not exist'
        });
    }
    else{
        res.status(200).json({
            tours:result
        });
    }

}));
});

// update company tour
router.patch('/update',checkAuth,function(req,res){
    const updateTour = req.body;
    Tour.findByIdAndUpdate(req.body.tourID,{$set:updateTour},function(err,result){   // tour id 
        if(err)
        {
            res.status(500).json({
                error:err
            });
        }
        if(result)
        {
            res.status(200).json({
                massege:'Tour updated',
                tour:result
            });

        }
    });
});

// delete company tour
router.delete('/remove',checkAuth,function(req,res){
    Tour.findByIdAndRemove(req.body.tourID,function(err,result){
        if(err)
        {
            res.status(500).json({
                error:err
            });
        }
        if(result)
        {
            res.status(200).json({
                massege:'Tour deleted'
            });
        }
    });
});
module.exports=router;