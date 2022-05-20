// Imports dos frameworks
import path from "path";
import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { errors } from "celebrate";

// Import das rotas
import routes from "./routes";

// Carrega aplicação e variáveis de ambiente
const app = express();
config({path: path.join(__dirname, "config", ".env")});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.listen(process.env.PORT || 3030);