import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
});

const User = model("User", UserSchema);

export default User;