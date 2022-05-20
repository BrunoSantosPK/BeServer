import { celebrate, Joi, Segments } from "celebrate";

export default class UserValidator {

    static login() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                user: Joi.string().required(),
                pass: Joi.string().required()
            })
        });
    }

}