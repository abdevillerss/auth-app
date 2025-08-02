const multer = require('multer');
const path = require('path');

// Storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

// File filter function
const checkFilter = function (req, file, cb) {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('This is not an image, please upload an image'));
  }
};

module.exports = multer({
  storage: storage,
  fileFilter: checkFilter,
  limits: {
    fileSize: 20 * 1024 * 1024, // 20 MB
  },
});
