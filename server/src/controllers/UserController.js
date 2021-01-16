import bcrypt from "bcrypt";
import User from "../models/User";

const UserController = {
  index: async (req, res) => {
    const substr = new RegExp(req.query.username, "i");
    const users = await User.find({ name: substr });
    return res.json({ users });
  },
  create: async (req, res) => {
    const username = req.query.username || "";
    const password = req.query.password || "";
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
      const msg = await User.create({
        name: username,
        password: bcrypt.hashSync(password, 10),
      });
      return res.json({ msg });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
  login: async (req, res) => {
    const user = await User.find({ name: req.query.username });
    console.log(user);
    if (user.length == 1) {
      if (!bcrypt.compareSync(req.query.password, user[0].password))
        return res.status(403).json({ msg: "Incorrect password." });
      return res.json(user[0]);
    }
    return res.status(403).json({ msg: "Username not found." });
  },
};

export default UserController;
