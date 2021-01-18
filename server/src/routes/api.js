import { Router } from "express";
import multer from "multer";
import UserController from "../controllers/UserController";
import PostController from "../controllers/PostController";
import Authentication from "../middleware/middleware";

const storageAvatar = multer.diskStorage({
  destination: "public/avatars/tmp/",
  filename: (req, file, cb) => {
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
  destination: "public/postImg/tmp",
  filename: (req, file, cb) => {
    cb(null, `POSTIMG-${Date.now()}.jpg`);
  },
});

const uploadPost = multer({
  storage: storagePost,
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.includes("image")) {
      return callback("Only images are allowed");
    }
    return callback(null, true);
  },
  limits: { fileSize: 100000000 },
});

const multipartFormData = multer();

const router = Router();
router
  .route("/user")
  .get(UserController.index)
  .post(UserController.create)
  .put(
    uploadAvatar.single("avatar"),
    Authentication.verifyUser,
    UserController.updateAvatar
  );
router.post("/login", multipartFormData.any(), UserController.login);
router.post("/authenticate", UserController.authenticate);

router
  .route("/post")
  .get(PostController.index)
  .post(
    uploadPost.array("images", 10),
    Authentication.verifyPost,
    PostController.create
  )
  .put(
    uploadPost.array("images", 10),
    Authentication.verifyPost,
    PostController.update
  )
  .delete(Authentication.verifyPost, PostController.delete);
router.route("/post/like").put(Authentication.verifyPost, PostController.like);
router
  .route("/post/comment")
  .put(Authentication.verifyPost, PostController.comment);

export default router;
