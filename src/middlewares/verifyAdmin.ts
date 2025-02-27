import { NextFunction,Request,Response } from "express"
import AppError from "../utils/AppError";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const verifyAdmin = async(req:Request,res:Response, next: NextFunction ): Promise<void> =>{
    try{
        const SECRET_KEY=process.env.JWT_SECRET as string
        const token = req.headers.authorization?.split(' ')[1]
        if(!token){
            return next(new AppError("Token não enviado.",401))
        }
        const decoded = jwt.verify(token,SECRET_KEY) as JwtPayload
        if(decoded.profile !== 'ADMIN'){
            return next(new AppError('Acesso não permitido.',401))
        }
        next()


    }catch(error){
        if (error instanceof Error) {
            next(new AppError(error.message, 401));
        } else {
            next(new AppError("Unknown error", 401));
        }
    }

}
export default verifyAdmin