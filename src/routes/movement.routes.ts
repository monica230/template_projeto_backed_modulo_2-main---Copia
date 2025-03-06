import { Router } from "express";
import verifyBranch from "../middlewares/verifyBranch";
import { MovementController } from "../controllers/movement.controller";

const movementRouter = Router();

const movementController = new MovementController();

movementRouter.post("/", verifyBranch, movementController.createMovement);

export default movementRouter;