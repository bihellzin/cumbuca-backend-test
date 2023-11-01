import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { JWTService } from "../services/auth.service";
import { BCryptService } from "../services/cryptography.service";
import { RegisterUserUseCase } from "../core/use-cases/users/userRegister";
import { LoginUserUseCase } from "../core/use-cases/users/login";
import { CheckUserBalanceUseCase } from "../core/use-cases/users/checkBalance";

interface IUserController {
  login: (req: Request, res: Response) => Promise<Response>;
  register: (req: Request, res: Response) => Promise<Response>;
  checkBalance: (req: Request, res: Response) => Promise<Response>;
}

const prisma = new PrismaClient();
const prismaUserRepository = new UserRepository(prisma);
const jwtService = new JWTService();
const bcryptService = new BCryptService();

export const UsersController: IUserController = {
  login: async (req: Request, res: Response) => {
    try {
      const { cpf, password } = req.body;

      if (!cpf || !password) {
        throw new Error("Invalid credentials");
      }

      const useCase = new LoginUserUseCase(
        prismaUserRepository,
        jwtService,
        bcryptService
      );

      const result = await useCase.execute(cpf, password);

      return res.status(200).send({
        ...result,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error");
    }
  },
  register: async (req: Request, res: Response) => {
    try {
      const { cpf, fullName, password, confirmPassword, balance } = req.body;

      if (
        !cpf ||
        !fullName ||
        !password ||
        !confirmPassword ||
        balance === null ||
        balance === undefined
      ) {
        throw new Error("Information missing");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const useCase = new RegisterUserUseCase(
        prismaUserRepository,
        bcryptService
      );

      const user = await useCase.execute(cpf, fullName, balance, password);

      return res.status(200).send({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error");
    }
  },
  checkBalance: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        throw new Error("Invalid credentials");
      }

      if (!req.user.id) {
        throw new Error("Invalid credentials");
      }

      const useCase = new CheckUserBalanceUseCase(prismaUserRepository);

      const balance = await useCase.execute(req.user.id);
      return res.status(200).send({ balance });
    } catch (error) {
      return res.status(400).send("Error");
    }
  },
};
