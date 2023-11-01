import { compareSync, hashSync } from "bcrypt";

export interface ICryptographyService {
  passwordMatchHash: (requestPassword: string, hashPassowrd: string) => boolean;
  encryptString: (data: string) => string;
}

export class BCryptService implements ICryptographyService {
  constructor() {}

  passwordMatchHash(requestPassword: string, hashPassowrd: string) {
    return compareSync(requestPassword, hashPassowrd);
  }

  encryptString(data: string) {
    return hashSync(data, 10);
  }
}
