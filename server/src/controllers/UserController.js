import bcrypt from "bcrypt";
import fs from "fs";
import { Magic } from "mmmagic";
import User from "../models/User";

const UserController = {
  async index(req, res) {
    if (req.query.username && req.query.userID)
      return res
        .status(403)
        .json({ msg: "Cannot pass both username and userID." });
    if (req.query.userID) {
      const user = await User.findById(req.query.userID)
        .select("-password -token")
        .populate("posts");
      return res.json(user);
    }
    const substr = new RegExp(req.query.username, "i");
    const users = await User.find({ name: substr }).select("-password -token");
    return res.json(users);
  },
  async create(req, res) {
    const username = req.body.username || "";
    const password = req.body.password || "";
    if (username.length < 4 || username.length > 16) {
      return res.status(403).json({
        msg: { username: "username should have length between 4 ~ 16" },
      });
    }
    if (password.length < 4 || password.length > 32) {
      return res.status(403).json({
        msg: { password: "password should have length between 4 ~ 32" },
      });
    }
    try {
      const user = await User.create({
        name: username,
        password: bcrypt.hashSync(password, 10),
      });
      return res.json({
        _id: user._id,
        name: user.name,
        avatarUri: user.avatarUri,
        postNum: user.postNum,
        token: user.token,
      });
    } catch (err) {
      return res
        .status(403)
        .json({ msg: { username: err.errors.name.message } });
    }
  },
  async login(req, res) {
    const user = await User.find({ name: req.body.username });
    if (user.length === 1) {
      if (!bcrypt.compareSync(req.body.password, user[0].password))
        return res.status(403).json({
          msg: { password: "Incorrect password." },
        });
      return res.json({
        _id: user[0]._id,
        name: user[0].name,
        avatarUri: user[0].avatarUri,
        postNum: user[0].postNum,
        token: user[0].token,
      });
    }
    return res.status(403).json({ msg: { username: "Username not found." } });
  },
  async updateAvatar(req, res) {
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
