import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { TransactionRepository } from "../repositories/transaction.repository";
import { JWTService } from "../services/auth.service";
import { RegisterTransactionUseCase } from "../core/use-cases/transactions/registerTransaction";
import { ListUserTransactionsUseCase } from "../core/use-cases/transactions/listUserTransactions";

const prismaTransactionRepository = new TransactionRepository(
  new PrismaClient()
);
const jwtService = new JWTService();

export const TransactionsController = {
  register: async (req: Request, res: Response) => {
    try {
      const useCase = new RegisterTransactionUseCase(
        prismaTransactionRepository
      );

      const { recipientId, amount } = req.body;

      const senderId = req.user!.id;

      if (!senderId || !recipientId || !amount) {
        throw new Error("Missing information");
      }

      const transaction = await useCase.execute(senderId, recipientId, amount);
      return res.status(200).send({ transaction });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error");
    }
  },
  listTransactions: async (req: Request, res: Response) => {
    try {
      const { startDate: startDateString, endDate: endDateString } = req.query;

      if (!startDateString || !endDateString) {
        throw new Error("Missing information");
      }

      const useCase = new ListUserTransactionsUseCase(
        prismaTransactionRepository
      );

      const startDate = new Date(startDateString as string);
      const endDate = new Date(endDateString as string);

      const transactions = await useCase.execute(
        startDate,
        endDate,
        req.user!.id
      );

      return res.status(200).send(transactions);
    } catch (error) {
      return res.status(400).send("Error");
    }
  },
};
