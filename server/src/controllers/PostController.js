import Post from "../models/Post";
import User from "../models/User";

const PostController = {
  async index(req, res) {
    const { user } = req.query;
    const posts = await Post.find({ user }).populate("user", "name");
    return res.json({ posts });
  },
  async create(req, res) {
    const data = req.body;
    if (!data.user)
      return res.status(403).json({ msg: "user field is required" });
    if (!data.token)
      return res.status(403).json({ msg: "token field is required" });
    if (!data.type)
      return res.status(403).json({ msg: "type field is required" });
    if (!data.images && !data.content)
      return res
        .status(403)
        .json({ msg: "Need images field or content field" });
    try {
      const msg = await Post.create(data);
      await User.updateOne({ _id: data.user }, { $inc: { postNum: 1 } });
      return res.json({ msg });
    } catch (err) {
      console.log(err);
      return res.status(403).json({ msg: err.errors.type.message });
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
    const filter = { _id: data.postID };
    try {
      const msg = await Post.updateOne(filter, data);
      return res.json({ msg });
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
    const filter = { _id: data.postID };
    try {
      const result = await Post.findOne(filter);
      if (!result.likes.has(data.user)) result.likes.set(data.user, true);
      else result.likes.set(data.user, !result.likes.get(data.user));
      await Post.updateOne(filter, { likes: result.likes });
      return res.json({ msg: "Success" });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
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
    const user = await User.findById(data.user);
    const filter = { _id: data.postID };
    try {
      const msg = await Post.updateOne(filter, {
        $push: { comments: { name: user.name, content: data.comment } },
      });
      return res.json({ msg: "Success" });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
};

export default PostController;
