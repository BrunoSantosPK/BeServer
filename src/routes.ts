// Módulos
import { Router } from "express";
const routes = Router();

// Rotas
routes.get("/", () => { console.log("lambari aqui!") });

export default routes;