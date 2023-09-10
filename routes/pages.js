const express =require("express");
const {auth} =require("../midlleware/auth");
const router = express.Router();
router.get('/',(req,res)=>{
    res.render("home")
})
router.get('/teacher',auth,(req,res)=>{
    res.render("teacher")
})
router.get('/login',(req,res)=>{
    res.render("login")
})
router.get('/register',(req,res)=>{
    res.render("register")
})
module.exports=router;