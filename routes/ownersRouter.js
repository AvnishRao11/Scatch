const express=require('express');
const router=express.Router();
const ownermodel=require("../models/owner_model");


console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV==="development"){
    router.post('/create',async function(req,res){
        let owners=await ownermodel.find();
        if(owners.length>0){
            return res.status(503)
            .send("you dont have persmission to create a new owner");
        }
        let{fullname,email,password}=req.body;
        let createdOnwer=await ownermodel.create({
            fullname,
            email,
            password,
        });
        res.send(createdOnwer).status(202);
        
    });
}


router.get('/admin',function(req,res){
    let success=req.flash("success");
    res.render("create_products",{success});
});



module.exports=router;