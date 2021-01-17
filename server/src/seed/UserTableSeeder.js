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
        avatarUri: "avatars/cat.jpg",
        token: "andyTOKENOAO",
      },
      {
        name: "chiachia",
        password: bcrypt.hashSync("chiachia", 10),
        avatarUri: "avatars/dog.jpg",
        token: "chiachiaTOKENOAO",
      },
      {
        name: "benson",
        password: bcrypt.hashSync("benson", 10),
        avatarUri: "avatars/dog2.jpg",
        token: "bensonTOKENOAO",
      },
    ];
    await User.create(users);
  },
};

export default UserTableSeeder;
