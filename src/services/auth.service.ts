import { config } from "dotenv";
import { decode, sign } from "jsonwebtoken";
config();

export interface IAuthService {
  generateToken: (user: User) => string;
  decodeToken: (token: string) => any;
}

export class JWTService implements IAuthService {
  constructor() {}

  generateToken({ id, cpf, fullName }: User) {
    return sign(
      {
        id,
        cpf,
        fullName,
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "2h" }
    );
  }

  decodeToken(token: string) {
    return decode(token);
  }
}
