import { Router } from "express";
import * as AuthController from "../controllers/users/AuthController";
import auth from "../middleware/auth";

const router = Router();

router.post("/user/register", AuthController.register);
router.post("/user/login", AuthController.login);
router.post("/user/logout", auth, AuthController.logout);
router.get("/user/profile", auth, AuthController.getProfile);

export default router;
