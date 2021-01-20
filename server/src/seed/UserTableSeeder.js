import bcrypt from "bcrypt";
import User from "../models/User";

const UserTableSeeder = {
  name: "users",
  delete: async () => User.deleteMany({}),
  create: async () => {
    const users = [
      {
        name: "andy",
        password: bcrypt.hashSync("andy", 10),
        avatarUri: "/avatars/cat.jpg",
      },
      {
        name: "chiachia",
        password: bcrypt.hashSync("chiachia", 10),
        avatarUri: "/avatars/dog.jpg",
      },
      {
        name: "benson",
        password: bcrypt.hashSync("benson", 10),
        avatarUri: "/avatars/dog2.jpg",
      },
      {
        name: "niny",
        password: bcrypt.hashSync("niny", 10),
        avatarUri: "/avatars/niny.jpg",
      },
      {
        name: "iwonder",
        password: bcrypt.hashSync("iwonder", 10),
        avatarUri: "/avatars/iwonder.jpg",
      },
      {
        name: "dylan",
        password: bcrypt.hashSync("dylan", 10),
      },
      {
        name: "outline.tw",
        password: bcrypt.hashSync("outline.tw", 10),
        avatarUri: "/avatars/outline.jpg",
      },
      {
        name: "yueh",
        password: bcrypt.hashSync("yueh", 10),
        avatarUri: "/avatars/y.jpg",
      },
      {
        name: "admin",
        password: bcrypt.hashSync("admin", 10),
        token: "admin",
      },
    ];
    for (const user of users) await User.create(user);
  },
};

export default UserTableSeeder;
