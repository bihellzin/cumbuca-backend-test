import { IUserRepository } from "../../../repositories/user.repository";
import { ICryptographyService } from "../../../services/cryptography.service";

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private cryptographyService: ICryptographyService
  ) {}

  async execute(
    cpf: string,
    fullName: string,
    balance: number,
    password: string
  ) {
    const existingUser = await this.userRepository.getUserByCpf(cpf);

    if (existingUser) {
      throw new Error("There's an existing account using this CPF");
    }

    if (balance < 0) {
      throw new Error("Balance must be equal or greater than 0");
    }

    const passwordHash = this.cryptographyService.encryptString(password);

    const user = await this.userRepository.createUser({
      cpf,
      fullName,
      password: passwordHash,
      balance,
    });

    return user;
  }
}
