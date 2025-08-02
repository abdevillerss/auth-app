const express= require("express");
const  mongoose  = require("mongoose");
require("dotenv").config();


const connectTodb=async()=>{

    try{
       
        await mongoose.connect(process.env.MONGO_URI);
        console.log(" data base is connected");

    }catch(e){
        console.log(e,"500 error");
         process.exit(1);
}

}

module.exports = connectTodb;