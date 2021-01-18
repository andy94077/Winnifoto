/* eslint-disable consistent-return */
import User from "../models/User";
import Post from "../models/Post";

const Authentication = {
  async verifyUserID(req, res, next) {
    const userID = req.body.userID || "";
    const token = req.body.token || "";
    if (userID === "" || token === "")
      return res.status(401).json({ msg: "Athentication Error" });
    const ret = await User.find({ _id: userID, token });
    if (ret.length !== 1)
      return res.status(401).json({ msg: "Athentication Error" });
    next();
  },
  async verifyUser(req, res, next) {
    const userID = req.body.user || "";
    const token = req.body.token || "";
    if (userID === "" || token === "")
      return res.status(401).json({ msg: "Athentication Error" });
    const ret = await User.find({ _id: userID, token });
    if (ret.length !== 1)
      return res.status(401).json({ msg: "Athentication Error" });
    next();
  },
  async verifyPost(req, res, next) {
    const postID = req.body.postID || "";
    const userID = req.body.user || "";
    const token = req.body.token || "";
    if (userID === "" || token === "" || postID === "")
      return res.status(401).json({ msg: "Athentication Error" });
    try {
      const retUser = await User.find({ _id: userID, token });
      if (retUser.length !== 1)
        return res.status(401).json({ msg: "Athentication Error" });
      const retPost = await Post.find({ _id: postID, user: userID });
      if (retPost.length !== 1)
        return res.status(401).json({ msg: "Athentication Error" });
      next();
    } catch {
      return res.status(403).json({ msg: "Invalid postID or userID" });
    }
  },
};

export default Authentication;
