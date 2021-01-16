import Post from "../models/Post";

const PostParser = (req) => {
  const data = {};

  if (req.query.postID) data.postID = req.query.postID;
  data.userID = req.query.userID;
  data.token = req.query.token;
  data.type = req.query.type;
  if (req.query.content) data.content = req.query.content;
  if (req.query.time) data.time = new Date(req.query.time);
  if (req.query.location) data.localtion = req.query.location;
  if (req.query.styles) data.styles = req.query.styles;
  if (req.query.images) data.images = req.query.images;
  if (req.query.username) data.username = req.query.username;

  return data;
};

const PostController = {
  index: async (req, res) => {
    const { userID } = req.query;
    const posts = await Post.find({ userID });
    return res.json({ posts });
  },
  create: async (req, res) => {
    const data = PostParser(req);
    if (!data.userID) {
      return res.status(403).json({ msg: "userID field is required" });
    }
    if (!data.token) {
      return res.status(403).json({ msg: "token field is required" });
    }
    if (!data.type) {
      return res.status(403).json({ msg: "type field is required" });
    }
    try {
      const msg = await Post.create(data);
      return res.json({ msg });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
  update: async (req, res) => {
    const data = PostParser(req);
    if (!data.userID) {
      return res.status(403).json({ msg: "userID field is required" });
    }
    if (!data.token) {
      return res.status(403).json({ msg: "token field is required" });
    }
    if (!data.postID) {
      return res.status(403).json({ msg: "postID field is required" });
    }
    const filter = { _id: data.postID };
    try {
      const msg = await Post.findOneAndUpdate(filter, data, { new: true });
      return res.json({ msg });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
  delete: async (req, res) => {
    const data = PostParser(req);
    if (!data.userID) {
      return res.status(403).json({ msg: "userID field is required" });
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
  like: async (req, res) => {
    const data = PostParser(req);
    if (!data.userID) {
      return res.status(403).json({ msg: "userID field is required" });
    }
    if (!data.token) {
      return res.status(403).json({ msg: "token field is required" });
    }
    if (!data.postID) {
      return res.status(403).json({ msg: "postID field is required" });
    }
    const filter = { _id: data.postID };
    try {
      const update = [...(await Post.findOne(filter).likes), data.userID];
      await Post.findOneAndUpdate(filter, update, { new: true });
      return res.json({ msg: "Success" });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
  comment: async (req, res) => {
    const data = PostParser(req);
    if (!data.userID) {
      return res.status(403).json({ msg: "userID field is required" });
    }
    if (!data.token) {
      return res.status(403).json({ msg: "token field is required" });
    }
    if (!data.postID) {
      return res.status(403).json({ msg: "postID field is required" });
    }
    if (!data.username) {
      return res.status(403).json({ msg: "comment field is required" });
    }
    if (!data.comment) {
      return res.status(403).json({ msg: "comment field is required" });
    }
    const filter = { _id: data.postID };
    try {
      const update = [
        ...(await Post.findOne(filter).comments),
        { name: data.username, content: data.comment },
      ];
      await Post.findOneAndUpdate(filter, update, { new: true });
      return res.json({ msg: "Success" });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
};

export default PostController;
