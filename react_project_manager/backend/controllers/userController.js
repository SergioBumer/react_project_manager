import User from "../models/User.js";
import generateID from "../helpers/generateID.js";

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
    res.status(403).json({ msg: error})
  }
};

const findUserByEmail = async (email) => {
    const existingUser = await User.findOne({ email: email });
    if(existingUser!==null) {
        throw `User with email: ${existingUser.email} already exists.`;
    }
}

export { registerUser };
