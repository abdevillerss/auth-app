const express= require('express');

const adminmiddleware=(req,res,next)=>{

    if(req.userInfo.role  != "admin" ){
        res.status(500).json({
            message:"error user is not admin",
            success:false
        })
    }
    next();


}

module.exports= adminmiddleware;