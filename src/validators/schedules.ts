import { celebrate, Joi, Segments } from "celebrate";

const validator = {
    add: celebrate({
        [Segments.BODY]: Joi.object().keys({
            uid: Joi.string().required(),
            note: Joi.string().required(),
            title: Joi.string().required(),
            endDate: Joi.date().iso().raw().required(),
            startDate: Joi.date().iso().raw().required(),
            clientPhone: Joi.string().min(10).max(11).required()
        })
    }),

    get: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            uid: Joi.string().required()
        })
    }),

    delete: celebrate({
        [Segments.BODY]: Joi.object().keys({
            uid: Joi.string().required(),
            aid: Joi.string().required(),
            dateKey: Joi.date().iso().raw().required()
        })
    }),

    update: celebrate({
        [Segments.BODY]: Joi.object().keys({
            uid: Joi.string().required(),
            aid: Joi.string().required(),
            note: Joi.string().required(),
            title: Joi.string().required(),
            dateKey: Joi.date().iso().raw().required(),
            endDate: Joi.date().iso().raw().required(),
            startDate: Joi.date().iso().raw().required(),
            clientPhone: Joi.string().min(10).max(11).required()
        })
    })
};

export default validator;