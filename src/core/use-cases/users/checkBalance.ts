import { UserRepository } from "../../../repositories/user.repository";

export class CheckUserBalanceUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string): Promise<number> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new Error("User does not exist");
    }

    return user.balance;
  }
}
