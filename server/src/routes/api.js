import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

import UserController from "../controllers/UserController";
import PostController from "../controllers/PostController";
import Authentication from "../middleware/middleware";

const storageAvatar = multer.diskStorage({
  destination: "public/avatars/tmp/",
  filename: (req, file, cb) => {
    cb(null, `IMG_${uuidv4()}.jpg`);
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
    cb(null, `IMG_${uuidv4()}.jpg`);
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
    Authentication.verifyUserID,
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
router.put("/post/like", Authentication.verifyUser, PostController.like);
router.put("/post/comment", Authentication.verifyUser, PostController.comment);


export default router;
