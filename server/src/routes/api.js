import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();
router
  .route("/user")
  .get(UserController.index)
  .post(UserController.create)
  .put(UserController.updateAvatar);
router.route("/login").post(UserController.login);

export default router;
