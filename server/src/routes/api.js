import { Router } from "express";
import multer from "multer";
import UserController from "../controllers/UserController";
import PostController from "../controllers/PostController";

const storageAvatar = multer.diskStorage({
  destination: "public/avatars/tmp/",
  filename: (req, file, cb) => {
    console.log(req.body);
    console.log(file);
    cb(null, `IMAGE-${Date.now()}.jpg`);
  },
});

const uploadAvatar = multer({
  storage: storageAvatar,
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.includes("image")) {
      return callback("Only images are allowed");
    }
    return callback(null, true);
  },
  limits: { fileSize: 100000000 },
});

const storagePost = multer.diskStorage({
  destination: "public/postImg/",
  filename: (req, file, cb) => {
    console.log(req.body);
    console.log(file);
    cb(null, "IMAGE-tmp.jpg");
  },
});

const uploadPost = multer({
  storage: storagePost,
  limits: { fileSize: 100000000 },
});

const router = Router();
router
  .route("/user")
  .get(UserController.index)
  .post(UserController.create)
  .put(uploadAvatar.single("avatar"), UserController.updateAvatar);
router.route("/login").post(UserController.login);

router
  .route("/post")
  .get(PostController.index)
  .post(uploadPost.array("images", 10), PostController.create)
  .put(uploadPost.array("images", 10), PostController.update)
  .delete(PostController.delete);
router.route("/post/like").put(PostController.like);
router.route("/post/comment").put(PostController.comment);

export default router;
