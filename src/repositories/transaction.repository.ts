import { PrismaClient } from "@prisma/client";

type TransactionCreationProps = {
  senderId: string;
  recipientId: string;
  amount: number;
};

export interface ITransactionRepository {
  createTransaction: (props: TransactionCreationProps) => Promise<Transaction>;
  getTransactionInTimeRange: (
    startDate: Date,
    endDate: Date,
    userId: string
  ) => Promise<Transaction[]>;
}

const prisma = new PrismaClient();

export class TransactionRepository implements ITransactionRepository {
  constructor(private databaseClient: PrismaClient) {}

  async getTransactionInTimeRange(
    startDate: Date,
    endDate: Date,
    userId: string
  ) {
    const transactions = await this.databaseClient.transaction.findMany({
      where: {
        senderId: userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return transactions;
  }

  async createTransaction({
    senderId,
    recipientId,
    amount,
  }: TransactionCreationProps) {
    const transaction = await prisma.$transaction(async (tx) => {
      const sender = await tx.user.update({
        data: {
          balance: {
            decrement: amount,
          },
        },
        where: {
          id: senderId,
        },
      });

      if (sender.balance < 0) {
        throw new Error(`${sender} doesn't have enough to send ${amount}`);
      }

      await tx.user.update({
        data: {
          balance: {
            increment: amount,
          },
        },
        where: {
          id: recipientId,
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          amount,
          recipientId,
          senderId,
        },
      });

      return transaction;
    });

    return transaction;
  }
}
