import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import verifyAdmin from "../middlewares/verifyAdmin";

const userRouter = Router();
const userController=new UserController()
userRouter.post('/',verifyAdmin, userController.createUser)


export default userRouter;
