import Users from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../helper/index.js";

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const templateEmail = {
      from: "GROWMATCH",
      to: email,
      subject: "Link Reset Password",
      html: `<p>Silahkan klik dibawah ini untuk mereset password anda.</p> <p>${process.env.CLIENT_URL}/reset-password/${token}</p>`,
    };

    sendEmail(templateEmail);

    res.status(200).json({
      message: "Link Berhasil terkirim",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("TOKEN", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await Users.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.save();

    res.status(200).json({
      message:
        "Reset password berhasil. Silakan login dengan password baru Anda.",
    });
  } catch (error) {
    next(error);
  }
};
