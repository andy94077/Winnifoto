import Post from "../models/Post";
import User from "../models/User";

const PostController = {
  async index(req, res) {
    const { postID } = req.query || "";
    if (!postID) {
      const posts = await Post.find({}).populate("user", ["name", "avatarUri"]);
      return res.json(posts);
    }
    const post = await Post.findById(postID).populate("user", [
      "name",
      "avatarUri",
    ]);
    return res.json(post);
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
      const ret = await Post.create(data);
      await User.updateOne({ _id: data.user }, { $push: { posts: ret._id } });
      return res.json({ ret });
    } catch (err) {
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
      await Post.updateOne(filter, {
        $push: { comments: { name: user.name, content: data.comment } },
      });
      return res.json({ msg: "Success" });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
};

export default PostController;
