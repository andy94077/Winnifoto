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
        images: ["/images/e.jpg", "/images/e2.jpg", "/images/e3.jpg"],
        type: "normal",
        location: "Taipei",
        styles: ["帥哥", "黑色"],
        likes: { [users[1]._id]: true, [users[2]._id]: true },
        content: `我是攝影師${users[0].name}，這是我的作品。\nmodel: 彭于晏。`,
        comments: [
          { user: users[1]._id, content: "好帥!" },
          { user: users[2]._id, content: "好好看!" },
        ],
      },
      {
        user: users[2]._id,
        images: ["/images/i.jpg", "/images/i-2.jpg", "/images/i2.jpg"],
        content: `想找跟照片裡的風格差不多的 model。預計外拍時間為${moment()
          .add(1, "days")
          .subtract(40, "minutes")
          .toDate()}。\nIG: @iwonder0309`,
        type: "findModel",
        time: moment().add(1, "days").subtract(40, "minutes").toDate(),
        location: "Tainan",
        styles: ["外拍", "妹子", "女僕"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { user: users[3]._id, content: "好漂亮!" },
          { user: users[0]._id, content: "唉呦不錯喔!" },
        ],
      },
      {
        user: users[3]._id,
        images: ["/images/n.jpg"],
        content: "IG: @niny1212_\n男友視角沒男友哭阿\n衣服 @zzooee___",
        type: "normal",
        location: "Penghu",
        styles: ["妹子", "男友視角"],
        likes: {
          [users[0]._id]: true,
          [users[1]._id]: true,
          [users[3]._id]: true,
        },
        comments: [
          { user: users[2]._id, content: "以下開放報名______" },
          { user: users[1]._id, content: "要不要來我家看PUI PUI 天竺鼠車車" },
        ],
      },
      {
        user: users[3]._id,
        images: ["/images/n2.jpg"],
        type: "findSnapper",
        content: "一年前的照片~\n下週想去外拍!",
        time: moment().add(1, "weeks").toDate(),
        location: "Taipei",
        styles: ["制服", "外拍"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { user: users[2]._id, content: "好看!" },
          { user: users[4]._id, content: "++" },
          { user: users[0]._id, content: "超好看!" },
        ],
      },
      {
        user: users[4]._id,
        images: ["/images/i2.jpg"],
        content: "下週要約拍的，趕快私訊我!",
        type: "findSnapper",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["女僕", "外拍"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { user: users[1]._id, content: "已報名" },
          { user: users[0]._id, content: "終於!" },
        ],
      },
      {
        user: users[0]._id,
        images: ["/images/k.jpg"],
        content: "這次跟金城武合作，對方真的是非常專業又帥氣。",
        type: "findModel",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["帥哥", "金城武"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { user: users[0]._id, content: "大家幫我刷一排愛心" },
          { user: users[1]._id, content: "我這個人很簡單，有金城武，就給讚" },
        ],
      },
      {
        user: users[5]._id,
        images: ["/images/o.jpg"],
        content: "IG: @outline.tw",
        type: "normal",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["花"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
      },
      {
        user: users[1]._id,
        images: ["/images/h.jpg"],
        content: "how\nhoW\nhOw\nhOW\nHow\nHoW\nHOw\nHOW",
        type: "normal",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["howhow", "帥哥?"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { user: users[5]._id, content: "How do you do?" },
          {
            user: users[5]._id,
            content: "你媽超胖，你媽走過電視害我錯過一整季連續劇!",
          },
        ],
      },
      {
        user: users[5]._id,
        images: ["/images/o2.jpg"],
        content: "This is the body.",
        type: "normal",
        time: moment().add(3, "days").toDate(),
        location: "Taipei",
        styles: ["style1", "style2"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { user: users[5]._id, content: "hi" },
          { user: users[1]._id, content: "HAHAHA" },
        ],
      },
      {
        user: users[0]._id,
        images: ["/avatars/cat.jpg", "/avatars/dog.jpg"],
        type: "normal",
        content: "andy",
        time: new Date("2021-01-17"),
        location: "Taipei City",
        styles: ["style 1", "style 2"],
        likes: { [users[0]._id]: true, [users[1]._id]: true },
        comments: [
          { user: users[1]._id, content: "hi" },
          { user: users[5]._id, content: "HAHAHA" },
        ],
      },
      {
        user: users[7]._id,
        type: "findModel",
        content: "chiachia",
        time: Date.now(),
        location: "Taipei City",
        styles: ["style 1", "style 2"],
        images: ["/avatars/cat.jpg", "/avatars/dog.jpg"],
        likes: { [users[3]._id]: true },
        comments: [
          { user: users[0]._id, content: "hi" },
          { user: users[0]._id, content: "HAHAHA" },
        ],
      },
      {
        user: users[7]._id,
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
          { user: users[3]._id, content: "hi" },
          { user: users[2]._id, content: "HAHAHA" },
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
