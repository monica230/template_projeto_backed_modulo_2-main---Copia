import { NextFunction, Response, Request } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
import AppError from "../utils/AppError";
import bcrypt from "bcrypt";
import { Driver } from "../entities/Driver";
import { Branch } from "../entities/Branch";
import { EnumProfile } from "../entities/User";
import jwt from "jsonwebtoken"

export class UserController {
  private userRepository;
  private driverRepository;
  private branchRepository;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.driverRepository = AppDataSource.getRepository(Driver);
    this.branchRepository = AppDataSource.getRepository(Branch);
  }
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, profile, email, password, document, full_address } =
        req.body;

      if (!name || !profile || !email || !password) {
        throw new AppError("Todos os campos são obrigatorios", 400);
      }
      const emailExists = await this.userRepository.findOne({
        where: { email },
      });
      if (emailExists) {
        throw new AppError("Email já existe", 409);
      }
      const user = this.userRepository.create({
        name,
        profile,
        email,
      });

      const salt = Number(process.env.SALT_BCRYPT);
      const password_cripto = bcrypt.hashSync(password, salt);
      const newUser = await this.userRepository.save({
        ...user,
        password_hash: password_cripto,
      });
      if (profile === "DRIVER") {
        await this.driverRepository.save({
          full_address: full_address,
          document: document,
          user_id: newUser.id,
        });
        res.status(201).json({
          name: newUser.name,
          profile: newUser.profile,
        });
        return;
      } else if (profile === "BRANCH") {
        await this.branchRepository.save({
          full_address: full_address,
          document: document,
          user_id: newUser.id,
        });
        res.status(201).json({
          name: newUser.name,
          profile: newUser.profile,
        });
      } else if (profile === "ADMIN") {
        res.status(201).json({
          name: newUser.name,
          profile: newUser.profile,
        });
      }
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  listAllUsers = async (req: Request, res: Response, next: NextFunction)=> {
      try {
          const { profile } = req.query as { profile?: string };
  
          const users = await this.userRepository.find({
              select: ["id", "name", "profile", "status"],
              where: { profile: profile as EnumProfile },
          });
  
          if (!users.length) {
              return next(new AppError("Nenhum usuário encontrado.", 404));
          }
  
          res.status(200).json({ success: true, data: users });
      } catch (err) {
          next(err);
      }
  };

  listById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization?.split(" ")[1] || "";

        if (!token) {
            return next(new AppError("Token não fornecido.", 403));
        }

        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET || "") as { id: string };
        } catch {
            return next(new AppError("Token inválido ou expirado.", 403));
        }

        const userId = Number(decodedToken.id);

        const userLogged = await this.userRepository.findOne({ where: { id: userId } });

        if (!userLogged) {
            return next(new AppError("Usuário autenticado não encontrado.", 404));
        }

        if (userLogged.profile === "DRIVER" && Number(id) !== userId) {
            return next(new AppError("Acesso negado.", 403));
        }

        if (userLogged.profile === "BRANCH") {
            return next(new AppError("Acesso negado.", 403));
        }

        const user = await this.userRepository.findOne({
            select: ["id", "name", "profile", "status"],
            where: { id: Number(id) },
        });

        if (!user) {
            return next(new AppError("Usuário não encontrado.", 404));
        }

        let extraData = null;

        if (user.profile === "DRIVER") {
            extraData = await this.driverRepository.findOne({
                where: { user_id: user.id },
                select: ["full_address"],
            });
        } else if (user.profile === "BRANCH") {
            extraData = await this.branchRepository.findOne({
                where: { user_id: user.id },
                select: ["full_address"],
            });
        }

        res.status(200).json({ ...user, extraData });
    } catch (err) {
        next(err);
    }
};
}
