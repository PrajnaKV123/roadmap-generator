// server/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/user");


// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        interests: user.interests,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});


// UPDATE PROFILE (bio & interests)
router.put("/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { bio, interests } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { bio, interests },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        interests: user.interests,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;