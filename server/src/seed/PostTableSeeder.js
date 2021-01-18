import moment from "moment";
import Post from "../models/Post";
import User from "../models/User";

const PostTableSeeder = {
  name: "posts",
  delete: async () => Post.deleteMany({}),
  create: async () => {
    const users = await User.find();
    const posts = [
      {
        user: users[0]._id,
        images: ["/images/w.jpg"],
        type: "normal",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["style1", "style2"],
        likes: { [users[1]._id]: true, [users[2]._id]: true },
        content: "This is the body.",
        comments: [
          { name: "yueh", content: "hihi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[2]._id,
        images: ["/images/i.jpg", "/images/i-2.jpg", "/images/i2.jpg"],
        content: "This is the body.",
        type: "findModel",
        time: moment().add(1, "days").subtract(40, "minutes").toDate(),
        location: "Tainan",
        styles: ["style1", "style2"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "andy", content: "HAHA" },
        ],
      },
      {
        user: users[2]._id,
        images: ["/images/n.jpg"],
        content: "This is the body.",
        type: "findModel",
        time: moment().add(2, "days").toDate(),
        location: "Penghu",
        styles: ["style1", "style2"],
        likes: {
          [users[0]._id]: true,
          [users[1]._id]: true,
          [users[3]._id]: true,
        },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[3]._id,
        images: ["/images/n2.jpg"],
        type: "normal",
        content: "This is the body.",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["style1", "style2"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "chiachia", content: "hihi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[3]._id,
        images: ["/images/i2.jpg"],
        content: "This is the body.",
        type: "findSnapper",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["style1", "style2"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[0]._id,
        images: ["/images/f.jpg"],
        content: "This is the body.",
        type: "findSnapper",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["style1", "style2"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[2]._id,
        images: ["/images/o.jpg"],
        content: "This is the body.",
        type: "normal",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["style1", "style2"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[1]._id,
        images: ["/images/t.jpg"],
        content: "This is the body.",
        type: "normal",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["style1", "style2"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[4]._id,
        images: ["/images/o2.jpg"],
        content: "This is the body.",
        type: "normal",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["style1", "style2"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[0]._id,
        type: "normal",
        content: "andy",
        time: new Date("2021-01-17"),
        location: "Taipei City",
        styles: ["style 1", "style 2"],
        images: ["/avatars/cat.jpg", "/avatars/dog.jpg"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[1]._id,
        type: "findModel",
        content: "chiachia",
        time: Date.now(),
        location: "Taipei City",
        styles: ["style 1", "style 2"],
        images: ["/avatars/cat.jpg", "/avatars/dog.jpg"],
        likes: { [users[3]._id]: true },
        comments: [
          { name: "andy", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        user: users[0]._id,
        type: "findSnapper",
        content: "benson",
        time: Date.now(),
        location: "Taipei City",
        styles: ["style 1", "style 2"],
        images: ["/avatars/cat.jpg", "/avatars/dog.jpg"],
        likes: {
          [users[0]._id]: true,
          [users[3]._id]: true,
          [users[4]._id]: true,
        },
        comments: [
          { name: "andy", content: "hi" },
          { name: "chiachia", content: "HAHAHA" },
        ],
      },
    ];
    const ret = await Post.create(posts);
    for (const p of ret) {
      await User.updateOne({ _id: p.user }, { $push: { posts: p._id } });
    }
  },
};

export default PostTableSeeder;
