const  cloudinary  = require("../config/cloudinary")

const uploadTocloudinary = (path)=>{

    const result = cloudinary.uploader.upload(path);
try{

    return{
        url: result.secure_url,
        public_id: result.public_id
    }
}catch(error){
    console.error(" error occured in cloudinary file");
}
}

module.exports= uploadTocloudinary;