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
        name: "test",
        password: bcrypt.hashSync("test", 10),
        token: "test",
      },
      {
        name: "admin",
        password: bcrypt.hashSync("admin", 10),
        token: "admin",
      },
    ];
    await User.create(users);
  },
};

export default UserTableSeeder;
