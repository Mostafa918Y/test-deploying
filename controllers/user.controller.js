const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }
    const existedEmail = await User.findOne({ email });
    if (existedEmail) {
      return res.status(409).json({ message: "Email is already existed" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const refreshToken = generateRefreshToken(newUser._id,newUser.role)
    const accessToken = generateAccessToken(newUser._id)
    newUser.refreshToken=refreshToken
    await newUser.save()
    res.cookie("jwt",refreshToken,{
      httpOnly:true,
      sameSite:"none",
      maxAge:7*24*60*60*1000
    })
    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        name:newUser.name,
        email: newUser.email,
        accessToken:accessToken
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invailed Email or Password" });
    }

    const refreshToken = generateRefreshToken(user._id)
    const accessToken = generateAccessToken(user._id,user.role)
    res.cookie("refreshToken",refreshToken,{
      httpOnly:ture,
      sameSite:"none",
      maxAge:7*24*60*60*100
    })
    res.status(200).json({
      message: "Signin successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        accessToken:accessToken
      },
    });
  } catch (error) {
    console.error("Signin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signIn ,signUp};
