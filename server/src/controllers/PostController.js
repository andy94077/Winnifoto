import fs from "fs";
import path from "path";
import Post from "../models/Post";
import User from "../models/User";

const PostController = {
  async index(req, res) {
    const { postID } = req.query || "";
    if (!postID) {
      const posts = await Post.find({})
        .sort({ createdAt: -1 })
        .populate("user comments.user", ["name", "avatarUri"]);
      return res.json(posts);
    }
    try {
      const post = await Post.findById(postID).populate("user comments.user", [
        "name",
        "avatarUri",
      ]);
      if (post === null)
        return res.status(404).json({ msg: "Post Not Found." });
      return res.json(post);
    } catch {
      return res.status(403).json({ msg: "Post Not Found." });
    }
  },
  async create(req, res) {
    const data = req.body;
    if (!data.user)
      return res.status(403).json({ msg: "user field is required" });
    if (!data.type)
      return res.status(403).json({ msg: "type field is required" });
    if (req.files.length === 0 && !data.content) {
      return res
        .status(403)
        .json({ msg: "Need images field or content field" });
    }
    // return res.json({ msg: "Still testing" });
    try {
      let ret = await Post.create(data);
      await User.updateOne({ _id: data.user }, { $push: { posts: ret._id } });

      if (req.files.length >= 0)
        fs.mkdirSync(`public/postImg/${ret._id}/`, (err) => {
          if (err) res.status(403).json({ msg: err });
        });
      const pathList = [];
      for (const fp of req.files) {
        const newPath = `/postImg/${ret._id}/${fp.filename}`;

        fs.renameSync(fp.path, path.join("public", newPath), (err) => {
          if (err) res.status(403).json(err);
        });
        pathList.push(newPath);
      }

      ret = await Post.findOneAndUpdate(
        { _id: ret._id },
        { images: pathList },
        { new: true }
      ).populate("user comments.user", ["name", "avatarUri"]);

      return res.json(ret);
    } catch (err) {
      return res.status(403).json({ msg: err });
    }
  },
  async update(req, res) {
    const data = req.body;
    if (!data.user) {
      return res.status(403).json({ msg: "user field is required" });
    }
    if (!data.token) {
      return res.status(403).json({ msg: "token field is required" });
    }
    if (!data.postID) {
      return res.status(403).json({ msg: "postID field is required" });
    }
    try {
      const ret = await Post.findOneAndUpdate({ _id: data.postID }, data, {
        new: true,
      }).populate("user comments.user", ["name", "avatarUri"]);
      return res.json(ret);
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
  async delete(req, res) {
    const data = req.body;
    if (!data.user) {
      return res.status(403).json({ msg: "user field is required" });
    }
    if (!data.token) {
      return res.status(403).json({ msg: "token field is required" });
    }
    if (!data.postID) {
      return res.status(403).json({ msg: "postID field is required" });
    }
    const filter = { _id: data.postID };
    try {
      await Post.deleteOne(filter);
      return res.json({ msg: "Success" });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
  async like(req, res) {
    const data = req.body;
    if (!data.user) {
      return res.status(403).json({ msg: "user field is required" });
    }
    if (!data.token) {
      return res.status(403).json({ msg: "token field is required" });
    }
    if (!data.postID) {
      return res.status(403).json({ msg: "postID field is required" });
    }
    try {
      const result = await Post.findById(data.postID);
      if (result === null)
        return res.status(404).json({ msg: "Post Not Found" });
      if (!result.likes.has(data.user)) result.likes.set(data.user, true);
      else result.likes.set(data.user, !result.likes.get(data.user));
      const updatedPost = await Post.findOneAndUpdate(
        { _id: data.postID },
        {
          likes: result.likes,
          $inc: { likesNum: result.likes.get(data.user) ? 1 : -1 },
        },
        { new: true }
      ).populate("user comments.user", ["name", "avatarUri"]);
      return res.json(updatedPost);
    } catch (err) {
      return res.status(403).json({ msg: err });
    }
  },
  async comment(req, res) {
    const data = req.body;
    if (!data.user) {
      return res.status(403).json({ msg: "user field is required" });
    }
    if (!data.token) {
      return res.status(403).json({ msg: "token field is required" });
    }
    if (!data.postID) {
      return res.status(403).json({ msg: "postID field is required" });
    }
    if (!data.comment) {
      return res.status(403).json({ msg: "comment field is required" });
    }
    try {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: data.postID },
        {
          $push: { comments: { user: data.user, content: data.comment } },
          $inc: { commentsNum: 1 },
        },
        { new: true }
      ).populate("user comments.user", ["name", "avatarUri"]);
      return res.json(updatedPost);
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
};

export default PostController;
