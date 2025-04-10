const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid token");
    }
    const decodedobj = await jwt.verify(token, "tinder@wesx890");
    const { _id } = decodedobj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User doesnt Exist");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(404).send("ERROR: "+err.message)
  }
};

module.exports = {
  userAuth,
};
