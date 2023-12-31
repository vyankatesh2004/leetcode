const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const url = "https://leetcode-client.onrender.com";

  res.header("Access-Control-Allow-Origin", url);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);

  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) return res.json({ status: true, user: user.username, email: user.email })
      else return res.json({ status: false })
    }
  })
}