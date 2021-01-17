import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});

const PostSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: [true, "userID field is required."],
      ref: "users",
    },
    type: {
      type: String,
      required: [true, "type field is required."],
      validate: {
        validator: function (v) {
          return ["normal", "findModel", "findSnapper"].includes(v);
        },
        message: (props) =>
          `${props.value} is not a valid type! Should be one of normal, findModel, or findSnapper.`,
      },
    },
    content: {
      type: String,
      default: "",
    },
    time: Date,
    location: {
      type: String,
      default: "",
    },
    styles: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

// Creating a table within database with the defined schema
const Post = mongoose.model("posts", PostSchema);

// Exporting table for querying and mutating
export default Post;
