import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import AppError from "../utils/AppError";
import bcrypt from "bcrypt";
import { Algorithm } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

export type Payload ={
id:string
profile:string
}

export class AuthController {
  private userRepository;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw new AppError("Email é obrigatorio", 400);
      } else if (!password) {
        throw new AppError("Senha é obrigatorio", 400);
      }
      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
      throw new AppError('usuario não encontrado.',401)}
      const validPassword = await bcrypt.compare(password, user?.password_hash);
      if (!validPassword) {
        throw new AppError("email ou senha invalida.", 401);
      }
      const payload = { id: user?.id, profile: user?.profile };
      const secret = process.env.JWT_SECRET || "secret";
      const options = { expiresIn: 3600, algorithm: "HS256" as Algorithm };

      const token = jwt.sign(payload, secret, options);
      res
        .status(200)
        .json({ id: user?.id, profile: user?.profile, token: token });
    } catch (error) {
      next(error);
    }
  };
}
