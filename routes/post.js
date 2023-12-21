const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// Getting all
router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", getPost, (req, res) => {
  res.json(res.post);
});

// Getting posts by user ID
router.get("/createdBy/:id", async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.params.id });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: "Deleted Post" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: "Cannot find post" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.post = post;
  next();
}

module.exports = router;
