import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
    required: true,
  },
  interest: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("Users", userSchema);
export default Users;
