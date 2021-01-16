import mongoose from "mongoose";
import jsonwebtoken from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

import { SECRET } from "../config";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password field is required."],
  },
  token: String,
  postNum: { type: Number, default: 0 },
  avatarUrl: String,
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.generateJWT = () =>
  jsonwebtoken.sign(
    {
      id: this._id,
      name: this.name,
      password: this.password,
    },
    SECRET
  );

// Creating a table within database with the defined schema
const User = mongoose.model("users", UserSchema);

// Exporting table for querying and mutating
export default User;
