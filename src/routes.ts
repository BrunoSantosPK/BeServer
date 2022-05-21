// Módulos do express
import { Router } from "express";
const routes = Router();

// Controlles e validators
import UserController from "./controllers/users";
import UserValidator from "./validators/users";

import ScheduleValidator from "./validators/schedules";
import ScheduleController from "./controllers/schedule";

// Definição das rotas da API
routes.post("/login", UserValidator.login, UserController.login);

routes.post("/schedule", ScheduleValidator.add, ScheduleController.addAppointment);
routes.get("/schedule/:uid", ScheduleValidator.get, ScheduleController.getSchedule);
routes.put("/schedule", ScheduleValidator.update, ScheduleController.updateAppointment);
routes.delete("/schedule", ScheduleValidator.delete, ScheduleController.deleteAppointment);

export default routes;