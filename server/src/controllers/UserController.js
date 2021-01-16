import User from "../models/User";

const UserController = {
  index: async (req, res) => {
    const users = await User.find({});
    res.json({ users });
  },
};

export default UserController;
