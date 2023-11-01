import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";
import { decode, verify } from "jsonwebtoken";
import { config } from "dotenv";

config();

const prisma = new PrismaClient();
const prismaUserRepository = new UserRepository(prisma);

export const Auth = {
  validate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error("Invalid credentials");
      }

      verify(token, process.env.TOKEN_SECRET);
      const decodedToken = decode(token) as { id?: string };

      if (!decodedToken.id) {
        throw new Error("Invalid credentials");
      }

      const user = await prismaUserRepository.getUserById(decodedToken.id);

      if (!user) {
        throw new Error("Invalid credentials");
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(400).send("Invalid credentials");
    }
  },
};
