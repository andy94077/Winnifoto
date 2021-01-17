import { Router } from "express";
import UserController from "../controllers/UserController";
import PostController from "../controllers/PostController";

const router = Router();
router
  .route("/user")
  .get(UserController.index)
  .post(UserController.create)
  .put(UserController.updateAvatar);
router.route("/login").post(UserController.login);

router
  .route("/post")
  .get(PostController.index)
  .post(PostController.create)
  .put(PostController.update)
  .delete(PostController.delete);
router.route("/post/like").put(PostController.like);
router.route("/post/comment").put(PostController.comment);

export default router;
