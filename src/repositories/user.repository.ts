import { PrismaClient } from "@prisma/client";

type UserCreationProps = {
  cpf: string;
  fullName: string;
  balance: number;
  password: string;
};

type TUserRepository = {
  createUser: (props: UserCreationProps) => Promise<User>;
  getUserById: (id: string) => Promise<User | null>;
  getUserByCpf: (cpf: string) => Promise<User | null>;
};

export interface IUserRepository {
  createUser: (props: UserCreationProps) => Promise<User>;
  getUserById: (id: string) => Promise<User | null>;
  getUserByCpf: (cpf: string) => Promise<User | null>;
}

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  constructor(private databaseClient: PrismaClient) {}

  async createUser({ cpf, fullName, balance, password }: UserCreationProps) {
    const user = await this.databaseClient.user.create({
      data: {
        cpf,
        fullName,
        balance,
        password,
      },
    });

    return user;
  }

  async getUserById(id: string) {
    const user = await this.databaseClient.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async getUserByCpf(cpf: string) {
    const user = await this.databaseClient.user.findUnique({
      where: {
        cpf,
      },
    });
    return user;
  }
}
