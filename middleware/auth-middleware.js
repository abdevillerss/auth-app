const express= require('express');
const jwt = require('jsonwebtoken');
const authmiddleware =(req,res,next)=>{

const authHeader = req.headers["authorization"];

     const token = authHeader && authHeader.split(" ")[1];

     console.log(token);
     if(!token){
        return res.status(500).json({
            success: false,
            message:" this wrong token or it doesn't exist "
        })
     }


    //   decode this token to extract user info\

    try{

         const decodetoken= jwt.verify(token,process.env.JWT_SECRET_KEY);
         req.userInfo= decodetoken;
         console.log(decodetoken);
         next();

    }catch(error){
        console.error(" error occured while decodeing the token");
    }

}
module.exports= authmiddleware;