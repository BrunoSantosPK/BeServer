import { Request, Response } from "express";
import CustomResponse from "../utils/response";
import { getCollectionSchedules, getDatabase, getMongoClient } from "../database/connect";

export default class ScheduleController {

    static async getSchedule(request: Request, response: Response) {
        const { uid } = request.params;
        const res = new CustomResponse();
        const client = getMongoClient();

        try {
            // Conexão com banco de dados
            await client.connect();
            const database = getDatabase(client);
            const collection = getCollectionSchedules(database);

            // Busca documento
            const doc = await collection.findOne({ uid });
            if(doc == null) {
                res.setAttr("scheduleData", {});
            } else {
                res.setAttr("scheduleData", doc);
            }

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(400);

        } finally {
            await client.close();
            return response.json(res.getJSON());
        }
    }

    static async addAppointment(request: Request, response: Response) {
        const { uid, note, title, endDate, startDate, clientPhone } = request.body;
        const res = new CustomResponse();
        const client = getMongoClient();

        try {
            // Conexão com banco de dados
            await client.connect();
            const database = getDatabase(client);
            const collection = getCollectionSchedules(database);

            // Prepara objeto para inserção
            const dateKey = startDate.substring(0, 10);
            const appointmentId = (new Date()).getTime().toString() + Math.floor(Math.random() * 10);
            const appointment = { appointmentId, note, title, endDate, startDate, clientPhone };

            // Faz o push no documento
            const update = { $push: {[dateKey]: appointment} };
            await collection.updateOne({ uid }, update);

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(400);

        } finally {
            await client.close();
            return response.json(res.getJSON());
        }
    }

    static async deleteAppointment(request: Request, response: Response) {
        const { uid, aid, dateKey } = request.body;
        const res = new CustomResponse();
        const client = getMongoClient();

        try {
            // Conexão com banco de dados
            await client.connect();
            const database = getDatabase(client);
            const collection = getCollectionSchedules(database);

            // Remove item do documento
            const del = { [dateKey]: { appointmentId: aid } };
            await collection.updateOne({ uid }, { $pull: del });

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(400);

        } finally {
            await client.close();
            return response.json(res.getJSON());
        }
    }

    static async updateAppointment(request: Request, response: Response) {
        const { uid, aid, dateKey, note, title, endDate, startDate, clientPhone } = request.body;
        const res = new CustomResponse();
        const client = getMongoClient();

        try {
            // Conexão com banco de dados
            await client.connect();
            const database = getDatabase(client);
            const collection = getCollectionSchedules(database);

            // Verifica validade do id informado
            const doc = await collection.findOne({ uid });
            if(doc == null)
                throw new Error("Informado uid inválido");

            // Verifica o id do apontamento
            let exist = false;
            doc[dateKey].forEach((item: any) => {
                if(item.appointmentId == aid)
                    exist = true;
            });

            if(!exist)
                throw new Error("Informado aid inválido.");

            // Remove registro antigo e insere novo
            const newKey = startDate.substring(0, 10);
            const appointment = { aid, note, title, endDate, startDate, clientPhone };

            await collection.updateOne({ uid }, { $pull: {[dateKey]: {appointmentId: aid}} });
            await collection.updateOne({ uid }, { $push: {[newKey]: appointment} });

        } catch(error: any) {
            res.setMessage(error.message);
            res.setStatus(400);

        } finally {
            await client.close();
            return response.json(res.getJSON());
        }
    }

}