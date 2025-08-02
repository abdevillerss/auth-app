const uploadTocloudinary = require('../helper/cloudinaryHelper');
const Image = require('../models/image')
const cloudinaryHelper= require('../helper/cloudinaryHelper');
const upload = async (req, res) => {
    try {
        // cheack if file path exists
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: " file path doesn't exist "
            })
        }

        const { url, public_id } = await uploadTocloudinary(req.file.path);
        // now uplaod the path to mongodb
        const newuploadedimg = new Image({
            url,
            publicId: public_id, // Corrected to match model
            uploadedBy: req.userInfo.userId, // Corrected to match model and token
        })

        await newuploadedimg.save();
        return res.status(200).json({
            message: "uploaded correctly"
        })

    } catch (error) {
        console.error("Error in image controller:", error);
        return res.status(500).json({
            success: false,
            message: "An internal server error occurred.",
            error: error.message
        })
    }
}; // <-- THE FUNCTION ENDS HERE

const fetch= async(req,res)=>{

    try{

        const page = parseInt(req.query.page)|| 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip= (page -1)*limit;
        const sortBy= req.query.sortBy || 'createdAt';
        const sortOrder= req.query.sortOrder ==="asc" ?1:-1;
        const totalImages= await Image.countDocuments();
        const totalPages= Math.ceil(totalImages/limit);

        const sortObj={};
        sortObj[sortBy]=sortOrder;

        const images= await Image.find().sort(sortObj).skip(skip).limit(limit);

        



           

        if(!images){
            res.status(500).json({
                message:"error while loading  images "
            })
        }

        res.status(200).json({          
            success: true,
            message: " images loaded successfully",
            currentPage: page,
            totalPages:totalPages,
            totalImages:totalImages,
            data: images
        })

    }catch(error){
        console.error(" eror occured while fetching");
    }
}

const deleteimage =async(req,res)=>{

    try{

       const getimageTodelete = req.params.id;
       const userid = req.userInfo.userId;

       const image = await Image.findById(imageid);

       if(!image){
        res.status(500).json({
            message:" image is not avilable to delete",
            success: false
        })
       }

       if(image.uploadby.id!==userid){
         res.status(500).json({
            message:" Your not autherised to delete the image ",
            success: false
        })
       }
//     to delete form cloudinary 
       await cloudinaryHelper.uploader.destroy(image.public_id);

    //     to delete from mongodb
    await Image.findByIdAndDelete(image);

    res.status(200).json({
        success:true,
        message:" image is deleted"
    })
       

    }catch(error){
        console.error(" erorr while deleting image");
    }
}
// And the export is outside, where it belongs.
module.exports ={ upload,deleteimage,fetch};