import bcrypt from "bcrypt";
import fs from "fs";
import { Magic } from "mmmagic";
import User from "../models/User";

const UserController = {
  index: async (req, res) => {
    const substr = new RegExp(req.query.username, "i");
    const users = await User.find({ name: substr });
    return res.json({ users });
  },
  create: async (req, res) => {
    console.log(req.body);
    const username = req.body.username || "";
    const password = req.body.password || "";
    if (username.length < 4 || username.length > 16) {
      return res
        .status(403)
        .json({ msg: "username should have length between 4 ~ 16" });
    }
    if (password.length < 4 || password.length > 32) {
      return res
        .status(403)
        .json({ msg: "password should have length between 4 ~ 32" });
    }
    try {
      const user = await User.create({
        name: username,
        password: bcrypt.hashSync(password, 10),
      });
      return res.json({
        id: user._id,
        name: user.name,
        avatarUri: user.avatarUri,
        postNum: user.postNum,
      });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
  login: async (req, res) => {
    const user = await User.find({ name: req.body.username });
    if (user.length === 1) {
      if (!bcrypt.compareSync(req.body.password, user[0].password))
        return res.status(403).json({
          msg: {
            username: "Username exist.",
            password: "Incorrect password.",
          },
        });
      return res.json({
        id: user[0]._id,
        name: user[0].name,
        avatarUri: user[0].avatarUri,
        postNum: user[0].postNum,
        token: user[0].token,
      });
    }
    return res.status(403).json({ msg: { username: "Username not found." } });
  },
  updateAvatar: async (req, res) => {
    const img = req.body.avatar;

    fs.writeFile("public/avatars/tmpOAO.png", img, "binary", (err) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ msg: "Upload image error" });
      }
      return res.json({ msg: "success" });
    });
  },
};

export default UserController;
