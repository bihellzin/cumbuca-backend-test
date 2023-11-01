import { ITransactionRepository } from "../../../repositories/transaction.repository";

export class RegisterTransactionUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(senderId: string, recipientId: string, amount: number) {
    const transaction = await this.transactionRepository.createTransaction({
      senderId,
      recipientId,
      amount,
    });

    return transaction;
  }
}
