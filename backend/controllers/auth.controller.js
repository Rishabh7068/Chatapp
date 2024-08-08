import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, gender, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: " Password is not matched" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: " User Already Exists" });
    }

    // hash pass here

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Api for profile
    // https://avatar.iran.liara.run/public/boy
    // https://avatar.iran.liara.run/public/girl

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // GWT TOKEN

      generateToken(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user Data" });
    }
  } catch (error) {
    console.log("Error in Signup Controller", error.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const validation = await bcrypt.compare(password, user?.password || "");

    if (!user || !validation) {
      return res.status(400).json({ error: "Invalid Username or Password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in Login Controller", error.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("Error in logout Controller", error.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
