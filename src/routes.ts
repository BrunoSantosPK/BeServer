// Módulos
import { Router } from "express";
const routes = Router();

import UserController from "./controllers/users";
import UserValidator from "./validators/users";

// Rotas
routes.post("/login", UserValidator.login(), UserController.login);

export default routes;