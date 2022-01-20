const router = require("express").Router();
const auth = require("../middleware/verifyToken");
const User = require("../model/User");
const Post = require("../model/Post");

// any logged in user can see all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// any logged in user can add a post
router.post("/", auth, async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      desc: req.body.desc,
    });
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// only admins can add a post
router.post("/admins", auth, async (req, res) => {
  try {
    // verify user type is admin or not
    if (req.user.type != "ADMIN") {
      throw new Error("Only Admins Can Add Posts here!...");
    }
    const post = new Post({
      title: req.body.title,
      desc: req.body.desc,
    });
    await post.save();
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
