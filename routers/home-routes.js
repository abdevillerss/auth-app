const express= require('express');
const authmiddleware=require('../middleware/auth-middleware')

const router= express.Router();


router.get('/welcome',authmiddleware,(req,res)=>{
    res.json({
        message: "welcome to homepage"
    })
})

module.exports= router