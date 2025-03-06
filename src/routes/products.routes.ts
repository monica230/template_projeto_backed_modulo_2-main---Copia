import express, { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import verifyBranch from "../middlewares/verifyBranch";


const productRouter = Router()

const productController = new ProductController()

productRouter.post('/', verifyBranch, productController.create as express.RequestHandler)
productRouter.get('/', verifyBranch, productController.listAll)

export default productRouter;