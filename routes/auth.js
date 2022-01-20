const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

// register
router.post("/register", async (req, res) => {
  try {
    // verify the user if already exist
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      throw new Error("User is exists...");
    }
    // hashing password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      type: req.body.type,
    });

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    // verify the user if already exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Email is not found...");
    }
    // validate the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Incorrect Password!..");
    }

    // generate a JWT
    const token = await jwt.sign(
      {
        id: user._id,
        type: user.type,
      },
      process.env.SECRET
    );

    res.header("auth-token", token).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// logout

router.get("/logout", (req, res) => {
  res.header("auth-token", "").send("Logged out successfully");
});

module.exports = router;
