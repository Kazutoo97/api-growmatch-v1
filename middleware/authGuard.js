import jwt from "jsonwebtoken";
import Users from "../models/UsersModel.js";

export const authGuard = async (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization;

  //**Memeriksa apakah request header Authorization ada*/
  //**Jika ada*/
  if (header && header.startsWith("Bearer ")) {
    try {
      //**Memisahkan token dengan Bearer dan ambil array kedua "Bearer ${token}" */
      const token = header.split(" ")[1];
      //**Memeriksa token yang di kirim dengan secretKey apakah sama dengan _id */
      const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      //**Jika sama masukkan informasi baru kedalam req selanjutnya di variabel req.user ini biasa nya untuk role dll */
      req.user = await Users.findById(_id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized, Token Failed");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized, No Token");
    error.statusCode = 401;
    next(error);
  }
};
