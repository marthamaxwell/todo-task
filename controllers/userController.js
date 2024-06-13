import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, gender } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !gender
    ) {
      return res.status(400).json({
        message: "Input required fields",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: `Email ${email} already in use`,
      });
    }

    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({
        message: `Phone number ${phoneNumber} already in use`,
      });
    }

    if (!validator.isStrongPassword(password)) {
      res.status(400).json({
        message: `Weak password: Your password must include lowercase, uppercase, digits, symbols and must be at least 8 characters`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      phoneNumber,
      gender,
    });

    const token = jwt.sign(
      {
        _id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    user.auth.token = token;
    await user.save();
    return res.status(201).json({
      user: user,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { password, phoneNumber_or_email } = req.body;
    const user = await User.findOne({
      $or: [
        { email: phoneNumber_or_email },
        { phoneNumber: phoneNumber_or_email },
      ],
    });
    if (!user) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid user",
      });
    }

    const token = jwt.sign(
      {
        _id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    user.auth.token = token;
    await user.save();
    return res.status(201).json({
      user: user,
      message: "logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { register, login };
