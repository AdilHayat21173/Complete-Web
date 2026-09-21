require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");

const POSTModel = require("./models/post.model");
const imagekit = require("./services/storage.service");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage()
});


// CREATE POST
app.post("/posts", upload.single("image"), async (req, res) => {
  try {
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    const uploadResponse = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname
    });

    const post = await POSTModel.create({
      image: uploadResponse.url,
      caption: caption
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    console.log("CREATE POST ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
});


// GET ALL POSTS
app.get("/posts", async (req, res) => {
  try {
    const posts = await POSTModel.find();

    res.status(200).json({
      message: "Posts fetched successfully",
      posts
    });

  } catch (error) {
    console.log("GET POSTS ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
});


module.exports = app;