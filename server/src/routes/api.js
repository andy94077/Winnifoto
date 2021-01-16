import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();
router.route("/user").get(UserController.index);

export default router;
