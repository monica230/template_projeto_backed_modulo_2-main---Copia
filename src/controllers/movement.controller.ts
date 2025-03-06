import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Movement, movementStatusEnum } from "../entities/Movements"
import AppError from "../utils/AppError"
import { Branch } from "../entities/Branch"
import { Product } from "../entities/Product"
import { DeepPartial } from "typeorm"
import { User } from "../entities/User"

export class MovementController {
    private movementRepository 
    private branchRepository
    private productRepository
    private userRepository

    constructor() {
        this.movementRepository = AppDataSource.getRepository(Movement)
        this.branchRepository = AppDataSource.getRepository(Branch)
        this.productRepository = AppDataSource.getRepository(Product)
        this.userRepository = AppDataSource.getRepository(User)
    }

    createMovement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { destination_branch_id, product_id, quantity } = req.body;
    
            // Validações de entrada
            if (!destination_branch_id || isNaN(Number(destination_branch_id))) {
                return next(new AppError("O campo de filial de destino é obrigatório e deve ser um número.", 400));
            }
    
            if (!product_id || isNaN(Number(product_id))) {
                return next(new AppError("O campo de produto é obrigatório e deve ser um número.", 400));
            }
    
            if (quantity === undefined || isNaN(Number(quantity)) || quantity <= 0) {
                return next(new AppError("A quantidade é obrigatória e deve ser maior que 0.", 400));
            }
    
            // Busca pela filial de destino
            const destinationBranch = await this.branchRepository.findOne({ where: { id: Number(destination_branch_id) } });
    
            if (!destinationBranch) {
                return next(new AppError("Filial de destino não encontrada.", 404));
            }
    
            // Busca pelo produto
            const product = await this.productRepository.findOne({ where: { id: Number(product_id) } });
    
            if (!product) {
                return next(new AppError("Produto não encontrado.", 404));
            }
    
            // Verifica se há estoque suficiente
            if (product.amount < quantity) {
                return next(new AppError("Estoque insuficiente para essa movimentação.", 400));
            }
    
            // Impede movimentação para a mesma filial de origem
            if (destinationBranch.id === product.branch_id) {
                return next(new AppError("A filial de origem não pode ser a mesma que a de destino.", 400));
            }
    
            // Atualiza o estoque do produto
            product.amount -= quantity;
            await this.productRepository.save(product);
    
            // Registra a movimentação
            const movement = this.movementRepository.create({
                destination_branch_id: Number(destination_branch_id),
                product_id: Number(product_id),
                quantity: Number(quantity),
            });
    
            await this.movementRepository.save(movement);
    
            res.status(201).json({
                message: "Movimentação registrada com sucesso!",
                movement,
                origem: product.branch_id,
                destino: destinationBranch.id,
            });
        } catch (error) {
            next(error);
        }
    };

    listAllMovements = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const movements = await this.movementRepository.find({ relations: ["product", "branch"] });
    
            res.status(200).json({
                movements,
            });
        } catch (error) {
            next(error);
        }
    }

    startMovement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const { driver_id } = req.body;
    
            const movement = await this.movementRepository.findOne({ where: { id: Number(id) } });
    
            if (!movement) {
                return next(new AppError("Movimentação não encontrada.", 404));
            }
    
            // Atualiza o status da movimentação para "IN_PROGRESS"
            movement.status = "IN_PROGRESS" as DeepPartial<movementStatusEnum>;
            movement.driver_id = driver_id;
    
            await this.movementRepository.save(movement);
    
            // Obtém informações adicionais da filial e do motorista
            const destinationBranch = await this.branchRepository.findOne({
                where: { id: movement.destination_branch_id },
                relations: ["user"],
            });
    
            const driver = await this.userRepository.findOne({
                where: { id: driver_id },
                relations: ["driver"],
            });
    
            res.status(200).json({
                message: "Movimentação iniciada com sucesso.",
                movement,
                destinationBranch,
                driver,
            });
        } catch (error) {
            next(error);
        }
    }  
}