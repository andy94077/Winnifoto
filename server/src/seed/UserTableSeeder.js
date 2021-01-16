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
        avatarUrl: "/avatars/cat.jpg",
      },
      {
        name: "chiachia",
        password: bcrypt.hashSync("chiachia", 10),
        avatarUrl: "/avatars/dog.jpg",
      },
      {
        name: "benson",
        password: bcrypt.hashSync("benson", 10),
        avatarUrl: "/avatars/dog2.jpg",
      },
    ];
    await User.create(users);
  },
};

export default UserTableSeeder;
