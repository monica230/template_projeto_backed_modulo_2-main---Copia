import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import verifyAdmin from "../middlewares/verifyAdmin";

const userRouter = Router();
const userController=new UserController()
userRouter.post('/',verifyAdmin, userController.createUser)
userRouter.get('/',verifyAdmin, userController.listAllUsers)
userRouter.get('/:id', userController.listById)


export default userRouter;
