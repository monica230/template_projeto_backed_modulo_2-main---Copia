require("dotenv").config();

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";

import cors from "cors";

import userRouter from "./routes/user.routes";

import { handleError } from "./middlewares/handleError";

import authRouter from "./routes/auth.routes";
import logger from "./config/winston";
import verifyToken from "./middlewares/auth";
import productRouter from "./routes/products.routes";
import movementRouter from "./routes/movement.routes";

const app = express();

app.use(cors()); // Permite que o express entenda requisições de outros domínios

app.use(express.json()); // Permite que o express entenda JSON

app.use("/users", verifyToken as express.RequestHandler, userRouter);
app.use('/products', verifyToken as express.RequestHandler, productRouter)
app.use("/movements", verifyToken as express.RequestHandler, movementRouter);
app.use("/login", authRouter);

app.get("/env", (req, res) => {
  res.json({
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
  });
});

app.use(handleError);

AppDataSource.initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info(
        `O servidor está rodando em http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => console.log(error));
