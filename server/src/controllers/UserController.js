import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import User from "../models/User";

const UserController = {
  async index(req, res) {
    if (req.query.username && req.query.userID)
      return res
        .status(403)
        .json({ msg: "Cannot pass both username and userID." });
    if (req.query.userID) {
      try {
        const user = await User.findById(req.query.userID)
          .select("-password -token")
          .populate({ path: "posts", match: { type: "normal" } });
        if (user === null) res.status(404).json({ msg: "User Not Found." });
        return res.json(user);
      } catch {
        return res.status(403).json({ msg: "User Not Found." });
      }
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
      res.cookie("token", user.token, { httpOnly: true });
      return res.json({ token: user.token });
    } catch (err) {
      return res
        .status(403)
        .json({ msg: { username: err.errors.name.message } });
    }
  },
  async authenticate(req, res) {
    const user = await User.find({ token: req.body.token });
    if (user.length === 1) {
      return res.json({
        _id: user[0]._id,
        name: user[0].name,
        avatarUri: user[0].avatarUri,
        postNum: user[0].postNum,
        token: user[0].token,
      });
    }
    return res.status(403).json({ msg: "token is incorrect." });
  },
  async login(req, res) {
    const user = await User.find({ name: req.body.username });
    if (user.length === 1) {
      if (!bcrypt.compareSync(req.body.password, user[0].password))
        return res.status(403).json({
          msg: { password: "Incorrect password." },
        });
      return res.json({ token: user[0].token });
    }
    return res.status(403).json({ msg: { username: "Username not found." } });
  },
  async updateAvatar(req, res) {
    if (!req.file) return res.status(403).json({ msg: "Avatar is empty" });
    try {
      const newPath = `/avatars/IMG_${req.body.userID}.jpg`;
      await User.updateOne({ _id: req.body.userID }, { avatarUri: newPath });
      fs.renameSync(
        path.join(req.file.destination, req.file.filename),
        path.join("public", newPath),
        (err) => {
          if (err) res.status(403).json(err);
        }
      );
      return res.json({ path: newPath });
    } catch (err) {
      return res.status(403).json(err);
    }
  },
};

export default UserController;
