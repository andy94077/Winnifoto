import Post from "../models/Post";
import User from "../models/User";

const PostTableSeeder = {
  name: "posts",
  delete: async () => Post.deleteMany({}),
  create: async () => {
    const users = await User.find();
    const posts = [
      {
        userID: users[0]._id,
        type: "normal",
        content: "andy",
        time: new Date("2021-01-17"),
        localtion: "Taipei City",
        styles: ["style 1", "style 2"],
        images: ["/avatars/cat.jpg", "/avatars/dog.jpg"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { name: "chiachia", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        userID: users[1]._id,
        type: "findModel",
        content: "chiachia",
        time: Date.now(),
        localtion: "Taipei City",
        styles: ["style 1", "style 2"],
        images: ["/avatars/cat.jpg", "/avatars/dog.jpg"],
        likes: { [users[3]._id]: true },
        comments: [
          { name: "andy", content: "hi" },
          { name: "benson", content: "HAHAHA" },
        ],
      },
      {
        userID: users[0]._id,
        type: "findModel",
        content: "benson",
        time: Date.now(),
        localtion: "Taipei City",
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
    await Post.create(posts);
  },
};

export default PostTableSeeder;
