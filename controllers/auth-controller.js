const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust if needed

// ===================== REGISTER =====================
const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
        success: false
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already taken",
        success: false
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      success: true
    });

  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      message: "Server error during registration",
      success: false
    });
  }
};

// ===================== LOGIN =====================
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        success: false
      });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false
      });
    }

    // Generate JWT
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    // Set token in cookie
 
    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      success: true
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Server error during login",
      success: false
    });
  }
};


const changePassword =async(req,res)=>{

try{
      const userId= req.userInfo.userId;

      const {oldpassword,newpassword}= req.body;

     const user= await User.findById(userId);

     const isPassword= await bcrypt.compare( oldpassword,user.password);
      if(!isPassword){
           res.status(500).json({
            message:" password doesn't match",
            success: false

           })
      }
   
      const salt = await bcrypt.genSalt(10);
      const hashnewPassword= await bcrypt.hash(newpassword,salt);

      user.password= hashnewPassword;
       await user.save();


       res.status(200).json({
        message:'password successfully changed ',
        success: true
       })


}catch(error){
    console.error("error occured before changing password")
}


}

module.exports = {
  registerUser,
  loginUser,
  changePassword
};
