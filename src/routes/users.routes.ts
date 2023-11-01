import express from "express";
import { UsersController } from "../controllers/users.controller";
import { Auth } from "../middlewares/auth";

export const router = express.Router();

router.post("/login", UsersController.login);
router.post("/register", UsersController.register);
router.get("/balance", Auth.validate, UsersController.checkBalance);
