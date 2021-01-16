import "dotenv-defaults/config";

const { SECRET, MONGO_URL, PORT = 4000, NODE_ENV } = process.env;

export { SECRET, MONGO_URL, PORT, NODE_ENV };
