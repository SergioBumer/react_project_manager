import User from "../models/User.js";
import generateID from "../helpers/generateID.js";
import generateToken from "../helpers/generateJWT.js";

// Authentication, Register and User Confirmation

const registerUser = async (req, res) => {
  try {
    const userToBeCreated = new User(req.body);
    userToBeCreated.token = generateID();
    await findUserByEmail(userToBeCreated.email);
    const savedUser = await userToBeCreated.save();
    res.status(201).json(savedUser);
  } catch (error) {
    //console.error({ msg: error.message });
    res.status(403).json({ msg: error });
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    const error = new Error(`User with email: ${email} not found`);
    return res.status(404).json({ msg: error.message });
  }

  if ((await user.confirmedEmail) === false) {
    const error = new Error(`User with email: ${email} is not confirmed yet.`);
    return res.status(403).json({ msg: error.message });
  }

  if (!(await user.checkPassword(password))) {
    const error = new Error(`The password for ${email} is incorrect`);
    return res.status(403).json({ msg: error.message });
  }
  res.status(200).json({
    _id: user._id,
    email: user.email,
    name: user.name,
    token: generateToken(user._id),
  });
};

const checkToken = async (req, res) => {
  const token = req.params.token;
  const userTobeConfirmed = await User.findOne({ token });

  if (!userTobeConfirmed) {
    const error = new Error(`Token not valid`);
    return res.status(404).json({ msg: error.message });
  }

  try {
    userTobeConfirmed.confirmedEmail = true;
    userTobeConfirmed.token = "";
    await userTobeConfirmed.save();
    res.json({ msg: "Token is valid. The user is now available." });
  } catch (error) {
    console.log(error);
  }
};

const findUserByEmail = async (email) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser !== null) {
    throw `User with email: ${existingUser.email} already exists.`;
  }

  return existingUser;
};

const recoverPassword = async (req, res) => {
  const { email } = req.body;

  const userToRecover = await User.findOne({ email });
  if (!userToRecover) {
    const error = new Error(`User with email: ${email} not found`);
    return res.status(404).json({ msg: error.message });
  }

  try {
    userToRecover.token = generateID();
    await userToRecover.save();
    res.json({
      msg: "We have sent you an email with the password recovery instructions.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

const checkTokenToRecoverPassword = async (req, res) => {
  const token = req.params.token;
  const userTobeConfirmed = await User.findOne({ token });

  if (!userTobeConfirmed) {
    const error = new Error(`Token not valid`);
    return res.status(404).json({ msg: error.message });
  }

  try {
    res.json({ msg: "Token is valid. The user is now available." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

const updatePassword = async (req, res) => {
  const token = req.params.token;
  const password = req.body.password;
  const userTobeConfirmed = await User.findOne({ token });

  if (!userTobeConfirmed) {
    const error = new Error(`Token not valid`);
    return res.status(404).json({ msg: error.message });
  }

  try {
    userTobeConfirmed.password = password;
    userTobeConfirmed.token = "";
    await userTobeConfirmed.save();
    res
      .status(200)
      .json({ msg: "Your password has been succesfully updated!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};
export {
  registerUser,
  authenticate,
  checkToken,
  recoverPassword,
  checkTokenToRecoverPassword,
  updatePassword,
};
