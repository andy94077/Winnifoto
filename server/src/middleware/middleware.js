/* eslint-disable consistent-return */
import User from "../models/User";

const Authentication = {
  async verifyUser(req, res, next) {
    const userID = req.body.userID || "";
    const token = req.body.token || "";
    if (userID === "" || token === "")
      return res.status(401).json({ msg: "Athentication Error" });
    const ret = await User.find({ _id: userID, token });
    if (ret.length !== 1)
      return res.status(401).json({ msg: "Athentication Error" });
    next();
  },
  async verifyPost(req, res, next) {
    const userID = req.body.user || "";
    const token = req.body.token || "";
    if (userID === "" || token === "")
      return res.status(401).json({ msg: "Athentication Error" });
    const ret = await User.find({ _id: userID, token });
    if (ret.length !== 1)
      return res.status(401).json({ msg: "Athentication Error" });
    next();
  },
};

export default Authentication;
