const express=require('express');
const router=express.Router();
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
var Company=require('../models/company');
const checkAuth=require('../middleware/check-auth');

// sign up
router.post('/signup',function(req,res){
    Company.find({mail:req.body.mail}).exec().then(user=>{
        if(user.length>=1)
        {   
            return res.status(409).json({
                massage:'Mail Exists'
            });
        }
        else
        {
            bcrypt.hash(req.body.password,15,(err,hash)=>{
                if(err)
                {
                    return res.status(500).json({
                        error:err
                    });
                }
                else
                {
                    const company=new Company({
                        accountName:req.body.accountName,
                        job:req.body.job,
                        officialName:req.body.officialName,
                        rollingName:req.body.rollingName,
                        address:req.body.address,
                        mail:req.body.mail,
                        password:hash,
                        companyNumber:req.body.companyNumber,
                        fax:req.body.fax,
                        licenceNumber:req.body.licenceNumber,
                        licencePicture:req.body.licencePicture,
                        BankAccount:req.body.BankAccount,
                        website:req.body.website,
                        postNumber:req.body.postNumber
                    });
                
                company.save().then(result=>{
                    res.status(201).json({
                        message:"Company is created"
                    });
                    }).catch(err=>{
                        res.status(500).json({
                            error:err
                        });
                });
            }});
        }
    });

});

// login
router.post('/login',function(req,res){
    Company.findOne({mail:req.body.mail})
    .exec()
    .then(company=>{
    if (company===null)
    {
        return res.status(401).json({
            massage:'this company doesn\'t exist'
        });
    }
    bcrypt.compare(req.body.password,company.password,(err,result)=>{
        if(err)
        {
           return res.status(401).json({
                massage:'Auth failed'
            });           
        }
        if(result)
        {
            const token= jwt.sign({
                email:company.mail,
                companyID:company._id
            },
            "tripiano",
            { expiresIn: "30000" });
            return res.status(200). json({
                massage:'Auth successful',
                token:token
                    });
        }

        return res.status(401).json({
            massage:'Auth failed'
                }); 
    });
         
    })
    .catch(err=>
        { res.status(500).json({
            error:err
        });
    });
});

// update 
router.patch('/update',checkAuth,function(req,res){
    const companyUpdate=req.body;
    Company.findByIdAndUpdate( req.authData.companyID,{$set:companyUpdate},function(err,result){
        if(err)
        {
            res.status(500).json({
                error:err
            });
        }
        if(result)
        {
            res.status(200).json({
                massage:'company updated',
                company:result
            });
        }
    });
});


    
module.exports = router;