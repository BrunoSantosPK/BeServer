import { Request, Response } from "express";
import CustomResponse from "../utils/response";
import { getUserData } from "../utils/firebase";
import { getMongoClient, getDatabase, getCollectionSchedules } from "../database/connect";

export default class UserController {
    
    static async login(request: Request, response: Response) {
        const { user, pass } = request.body;
        const res = new CustomResponse();
        const client = getMongoClient();

        try {
            // Faz a validação das credenciais
            const dataLogin = await getUserData(user, pass);
            if(!dataLogin.success) {
                res.setStatus(401);
                res.setMessage(dataLogin.message as string);
            } else {
                // Verifica se o documento para agendamento foi inicializado
                // Caso não exista, faz a criação do documento
                await client.connect();
                const database = getDatabase(client);
                const collection = getCollectionSchedules(database);

                const schedule = await collection.findOne({uid: dataLogin.data?.user.uid});
                if(schedule == null) {
                    await collection.insertOne({uid: dataLogin.data?.user.uid});
                }

                // Prepara dados para enviar ao cliente
                res.setAttr("userData", {
                    "uid": dataLogin.data?.user.uid,
                    "email": dataLogin.data?.user.email
                });
            }

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(400);
        } finally {
            await client.close();
            return response.json(res.getJSON());
        }
    }

}