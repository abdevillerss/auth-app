const express= require('express');
const authmiddleware=require('../middleware/auth-middleware')
const adminmiddleware = require('.././middleware/admin-middleware');
const multer =require('../middleware/upload-middleware');
const {upload,deleteimage,fetch}= require('../controllers/image-controller');

const router= express.Router();


router.post('/upload',authmiddleware,adminmiddleware,multer.single('image'),upload);
router.post('/delete', authmiddleware, adminmiddleware, deleteimage);

router.get('/fetch', fetch);


module.exports= router