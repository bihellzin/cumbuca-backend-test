import express from "express";
import { TransactionsController } from "../controllers/transactions.controller";
import { Auth } from "../middlewares/auth";

export const router = express.Router();

router.post("/register", Auth.validate, TransactionsController.register);
router.get("/list", Auth.validate, TransactionsController.listTransactions);
