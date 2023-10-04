import Users from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  const { firstName, lastName, email, password, dob, interest } = req.body;
  try {
    //**check if user already registered*/
    const exist = await Users.findOne({ email });
    if (exist) {
      throw new Error(`Email already registered`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new Users({
      slug: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dob,
      interest,
    });

    await user.save();
    res.status(200).json({
      message: "Registration successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("Email or password wrong!");
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw new Error("Email or password wrong!");
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.status(200).json({ message: "Login successfully", data: accessToken });
  } catch (error) {
    next(error);
  }
};

export const profileUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user._id).select("-password");
    res.status(200).json({
      message: "Get profile user Success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  const cookies = req.cookies.jwt;
  if (!cookies) {
    return res.sendStatus(204);
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie Cleared" });
};
