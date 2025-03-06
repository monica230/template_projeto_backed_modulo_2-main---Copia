import { Branch } from './../entities/Branch';
import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Product } from "../entities/Product"
import AppError from "../utils/AppError"
import { AuthRequest } from "../middlewares/auth"
import { User } from "../entities/User"

export class ProductController {
    private productRepository

    constructor() {
        this.productRepository = AppDataSource.getRepository(Product)
    }

    create = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { name, amount, description, url_cover } = req.body;
    
            if (!name || name.length > 200) {
                return next(new AppError("O nome é obrigatório e deve ter no máximo 200 caracteres.", 400));
            }
    
            if (amount === undefined || amount < 0) {
                return next(new AppError("O valor deve ser informado e ser maior ou igual a 0.", 400));
            }
    
            if (!description || description.length > 200) {
                return next(new AppError("A descrição é obrigatória e deve ter no máximo 200 caracteres.", 400));
            }
    
            if (url_cover && url_cover.length > 200) {
                return next(new AppError("A URL de imagem deve ter no máximo 200 caracteres.", 400));
            }
    
            const user_id = req.userId;
        
            const user = await AppDataSource.getRepository(User).findOne({
                where: { id: Number(user_id) },
                relations: { branch: true },
            });
    
            if (!user || !user.branch) {
                return next(new AppError("Filial não encontrada.", 404));
            }
            console.log(amount)
    
            const newProduct = this.productRepository.create({

                name,
                amount: parseInt(amount),

                description,
                url_cover,
                branch_id: user.branch.id,
            });
    
            await this.productRepository.save(newProduct);
    
            res.status(201).json({ message: "Produto criado com sucesso!", product: newProduct });
        
        } catch (error) {
            console.log(error)
            next(error);
        }
    };

    listAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const products = await this.productRepository.find({
                relations: {
                    branch: true
                }
            });
    
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }
}