const UserModel = require("../models/User.model");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;


    const isUserAlreadyExists=await UserModel.findOne({
      email
    })

    if(isUserAlreadyExists){
      return res.status(409).json({
        message:"User already exists"
      })
    }

    const user = await UserModel.create({
      username,
      email,
      password
    });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}


// GET USERS
async function getUsers(req, res) {
  try {
    console.log ("cookies",req.cookies)

    const users = await UserModel.find();

    res.status(200).json({
      message: "Users fetched successfully",
      users
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}


module.exports = {
  registerUser,
  getUsers
};