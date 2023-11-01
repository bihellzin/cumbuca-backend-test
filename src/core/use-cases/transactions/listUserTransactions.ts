import { ITransactionRepository } from "../../../repositories/transaction.repository";

export class ListUserTransactionsUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(startDate: Date, endDate: Date, userId: string) {
    if (startDate >= endDate) {
      throw new Error(
        "Start date must be, at least, a day before the end date"
      );
    }

    const transactions =
      await this.transactionRepository.getTransactionInTimeRange(
        startDate,
        endDate,
        userId
      );

    return transactions;
  }
}
