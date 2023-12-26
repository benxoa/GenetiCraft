const bcrypt = require("bcrypt");
const User = require('../db/models/user.model')

module.exports.Register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const useremail = await User.findOne({ email: email });
      const user_username = await User.findOne({ username: username });
  
      if (useremail || user_username) {
        res.status(400).json({ message: "User Already Exists" });
      } else {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
        await newUser.save();
        return res.status(201).json({ message: "User Created" });
      }
    } catch (error) {
      res.status(500)
    }
  };
  
  module.exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = await user.generateAuthToken();
          res.cookie("Authtoken", token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: false,
          });
          res.status(200).json({
            message: "Login Success",  userId : user._id
          })

        } else {
          res.status(400).json({ message: "Invalid Credentials" });
        }
      } else {
        res.status(400).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res.status(500)
    }
  };
  
