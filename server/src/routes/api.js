import { Router } from "express";
import UserController from "../controllers/UserController";
import PostController from "../controllers/PostController";

const router = Router();
router.route("/user").get(UserController.index).post(UserController.create);
router
  .route("/post")
  .get(PostController.index)
  .post(PostController.create)
  .put(PostController.update)
  .delete(PostController.delete)
  .put(PostController.like)
  .put(PostController.comment);

export default router;
