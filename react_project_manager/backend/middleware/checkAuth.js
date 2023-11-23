import jwt from "jsonwebtoken";
import User from "../models/User.js";
const checkAuth = async (req, res, next) => {
  let token;
  console.log("From middleware");
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Authenticated");
    console.log(req.headers.authorization);

    try {
      token = req.headers.authorization.split(" ")[1];

      const { _id } = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findOne({ _id }).select(
        "-password -confirmedEmail -createdAt -updatedAt -token -__v"
      );

    } catch (error) {
      console.log(error);
      res.status(403).json({ msg: error.message });
    }
  } else {
    res.status(403).json({ msg: "Token is not valid!"})
  }
  return next();
};

export default checkAuth;
