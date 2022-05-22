import { Request, Response } from "express";
import CustomResponse from "../utils/response";
import { getUserData, createUser, resetPass, updatePass } from "../utils/firebase";
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

    static async newUser(request: Request, response: Response) {
        const { user, pass } = request.body;
        const res = new CustomResponse();

        try {
            // Cria novo usuário no firebase
            const dataCreate = await createUser(user, pass);
            if(!dataCreate.success)
                throw new Error(dataCreate.message);

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(400);
        } finally {
            return response.json(res.getJSON());
        }
    }

    static async resetPass(request: Request, response: Response) {
        const { user } = request.body;
        const res = new CustomResponse();

        try {
            // Envia e-mail para redefinição de senha
            const resReset = await resetPass(user);
            if(!resReset.success)
                throw new Error(resReset.message);

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(400);
        } finally {
            return response.json(res.getJSON());
        }
    }

    static async changePass(request: Request, response: Response) {
        const { user, pass, newPass } = request.body;
        const res = new CustomResponse();

        try {
            // Altera senha
            const resUpdate = await updatePass(user, pass, newPass);
            if(!resUpdate.success)
                throw new Error(resUpdate.message);

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(400);
        } finally {
            return response.json(res.getJSON());
        }
    }

}