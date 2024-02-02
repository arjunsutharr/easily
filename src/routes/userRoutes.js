import express from "express";
import UserController from "../controllers/user.controller.js";
import {
  userRegistrationValidationMiddleware,
  userLoginValidationMiddleware,
} from "../middlewares/userValidation.middleware.js";

const router = express.Router();
const userController = new UserController();

// Register user route
router.get("/register", userController.getRegisterView);
router.post(
  "/register",
  userRegistrationValidationMiddleware,
  userController.postRegister
);

// Login user route
router.get("/login", userController.getLoginView);
router.post("/login", userLoginValidationMiddleware, userController.postLogin);

// Logout user route
router.get("/logout", userController.postLogout);

export default router;
