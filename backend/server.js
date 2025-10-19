require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const admin = require('./firebase');
const User = require('./models/user');
const cors = require('cors');
 

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.DBCONNECT)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Firebase Token Verification Middleware
async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).send("Unauthorized: Invalid token");
  }
}

// Protected Route
app.post('/api/protected', verifyToken, async (req, res) => {
  const { uid, name, email, picture } = req.user;

  try {
    let user = await User.findOne({ uid });

    if (!user) {
      user = new User({ uid, name, email, picture });
      await user.save();
    }

    res.status(200).send({ message: "User verified and saved", user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send({ message: "Server error", error });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
