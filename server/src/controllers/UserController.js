import User from "../models/User";

const UserController = {
  index: async (req, res) => {
    const substr = new RegExp(req.query.username, "i");
    const users = await User.find({ name: substr });
    res.json({ users });
  },
};

export default UserController;
