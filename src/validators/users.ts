import { celebrate, Joi, Segments } from "celebrate";

const validator = {
    login: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user: Joi.string().required(),
            pass: Joi.string().required()
        })
    })
};

export default validator;