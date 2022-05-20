import { Request, Response } from "express";
import CustomResponse from "../utils/response";
import { getUserData } from "../utils/firebase";

export default class UserController {
    
    static async login(request: Request, response: Response) {
        const { user, pass } = request.body;
        const res = new CustomResponse();

        const dataLogin = await getUserData(user, pass);
        if(!dataLogin.success) {
            res.setStatus(401);
            res.setMessage(dataLogin.message as string);
        } else {
            res.setAttr("userData", {
                "uid": dataLogin.data?.user.uid,
                "email": dataLogin.data?.user.email
            });
        }

        return response.json(res.getJSON());
    }

}