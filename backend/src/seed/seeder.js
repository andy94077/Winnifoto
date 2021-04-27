/* eslint-disable no-await-in-loop */
import mongoose from "mongoose";
import { MONGO_URL } from "../config";
import UserTableSeeder from "./UserTableSeeder";
import PostTableSeeder from "./PostTableSeeder";

if (!MONGO_URL) {
  console.error("Missing MONGO_URL!!!");
  process.exit(1);
}

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.once("open", async () => {
  const seeders = [UserTableSeeder, PostTableSeeder];

  for (const seeder of seeders) {
    console.log(`Deleting table "${seeder.name}"...`);
    await seeder.delete();
  }

  for (const seeder of seeders) {
    console.log(`Creating table "${seeder.name}"...`);
    await seeder.create();
  }

  process.exit();
});
