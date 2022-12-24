import {Router} from "express";
import authController from "../controllers/authController";
import multer from "multer";

const router: Router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/validate", authController.validate);

export default router;