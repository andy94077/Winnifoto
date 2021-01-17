import Post from "../models/Post";

const PostParser = (req) => {
  const data = {};

  if (req.body.postID) data.postID = req.body.postID;
  data.userID = req.body.userID;
  data.token = req.body.token;
  data.type = req.body.type;
  if (req.body.content) data.content = req.body.content;
  if (req.body.time) data.time = new Date(req.body.time);
  if (req.body.location) data.location = req.body.location;
  if (req.body.styles) data.styles = req.body.styles;
  if (req.body.images) data.images = req.body.images;
  if (req.body.username) data.username = req.body.username;

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
    if (!data.userID)
      return res.status(403).json({ msg: "userID field is required" });
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
      return res.json({ msg });
    } catch (err) {
      console.log(err);
      return res.status(403).json({ msg: err.errors.type.message });
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
      const msg = await Post.updateOne(filter, data);
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
    console.log(req.body);
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
      const result = await Post.findOne(filter);
      if (!result.likes.has(data.userID)) result.likes.set(data.userID, true);
      else result.likes.set(data.userID, !result.likes.get(data.userID));
      await Post.updateOne(filter, { likes: result.likes });
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
      const msg = await Post.updateOne(filter, {
        $push: { comments: { name: data.username, content: data.comment } },
      });
      return res.json({ msg: "Success" });
    } catch (err) {
      return res.status(403).json({ msg: err.errors.name.message });
    }
  },
};

export default PostController;
