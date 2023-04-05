const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");



const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        isAdmin:user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });
  
  
  
  // @desc    Authenticate a user
  // @route   POST /api/users/login
  // @access  Public
  const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Check for user email
    const user = await User.findOne({ email });
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
  
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  });


  



  const generateToken = (id) => {
    return jwt.sign({ id }, "abcd123", {
      expiresIn: "3d",
    });
  };




  module.exports = {
    registerUser,
    loginUser,
   
  };
  