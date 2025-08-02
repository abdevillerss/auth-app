const express = require('express');
const { registerUser, loginUser,changePassword } = require('../controllers/auth-controller');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

const authmiddleware = require('../middleware/auth-middleware')
router.post('/changepassword',authmiddleware, changePassword);
module.exports = router;

