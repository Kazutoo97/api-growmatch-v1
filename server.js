import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

//**Import File */
import dbConn from "./config/dbConn.js";
import { ErrorHandler } from "./middleware/errorHandler.js";
import routerAuth from "./routes/authRouter.js";
import forgotPasswordRoutes from "./routes/forgotPasswordRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
//**Connect to MongoDB */
dbConn();

//**Middleware */
app.use(express.json());
app.use(
  cors({ origin: "https://grow-match-v1.vercel.app", credentials: true })
);
app.use(cookieParser());

//**All Routes */
app.use("/api/v1/auth", routerAuth);
app.use("/api/v1", forgotPasswordRoutes);
app.use("/", (req, res) => {
  res.send("Hello WOrld");
});

//**Middleware Error Handler */
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
