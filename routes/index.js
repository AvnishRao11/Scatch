const express=require('express');
const router=express.Router();
const isloggedIn=require("../middlewares/isloggedIn");
const productmodel = require('../models/product_model');
const usermodel = require('../models/user_model');

router.get('/',function(req,res){
    let error=req.flash("error");
    res.render('index',{error, loggedin:false});
});

router.get('/shop',isloggedIn,async function(req,res){
    let products=await productmodel.find();
    let success=req.flash("success");
    res.render('shop',{products,success});
});
router.get('/addtocart/:id',isloggedIn,async function(req,res){
    let user=await usermodel.findOne({email:req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect('/shop');
});
router.get('/cart',isloggedIn,async function(req,res){
    let user=await usermodel.findOne({email:req.user.email}).populate("cart");
    const bill=Number(user.cart[0].price)+20-Number(user.cart[0].discount);
    res.render('cart',{user,bill});
});

module.exports=router;