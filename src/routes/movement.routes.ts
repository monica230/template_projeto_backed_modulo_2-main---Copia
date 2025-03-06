import { Router } from "express";
import verifyBranch from "../middlewares/verifyBranch";
import { MovementController } from "../controllers/movement.controller";
import verifyDriver from "../middlewares/verifyDriver";

const movementRouter = Router();

const movementController = new MovementController();

movementRouter.post("/", verifyBranch, movementController.createMovement);
movementRouter.get("/", verifyBranch, movementController.listAllMovements);
movementRouter.patch("/:id/start", verifyDriver, movementController.startMovement);

export default movementRouter;