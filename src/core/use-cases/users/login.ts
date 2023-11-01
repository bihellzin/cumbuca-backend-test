import { IUserRepository } from "../../../repositories/user.repository";
import { IAuthService } from "../../../services/auth.service";
import { ICryptographyService } from "../../../services/cryptography.service";

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
    private cryptographyService: ICryptographyService
  ) {}

  async execute(cpf: string, password: string) {
    const user = await this.userRepository.getUserByCpf(cpf);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    if (!this.cryptographyService.passwordMatchHash(password, user.password)) {
      throw new Error("Invalid credentials");
    }

    const token = this.authService.generateToken(user);

    const { cpf: userCpf, id, fullName } = user;

    return {
      id,
      cpf: userCpf,
      fullName,
      token,
    };
  }
}
