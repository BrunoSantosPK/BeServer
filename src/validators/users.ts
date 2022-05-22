import { celebrate, Joi, Segments } from "celebrate";

const validator = {
    login: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user: Joi.string().email().required(),
            pass: Joi.string().min(6).required()
        })
    }),

    resetPass: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user: Joi.string().email().required()
        })
    }),

    updatePass: celebrate({
        [Segments.BODY]: Joi.object().keys({
            user: Joi.string().email().required(),
            pass: Joi.string().min(6).required(),
            newPass: Joi.string().min(6).required()
        })
    })
};

export default validator;