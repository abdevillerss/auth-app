const express= require('express');
const authmiddleware=require('../middleware/auth-middleware')
const adminmiddleware = require('../middleware/admin-middleware');

const router= express.Router();


router.post('/superadmin',authmiddleware,adminmiddleware,(req,res)=>{
    res.json({
        message: "welcome to admin page"
    })
})

module.exports= router