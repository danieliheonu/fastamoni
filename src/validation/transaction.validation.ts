import { Joi, validate } from "express-validation";

export const validateTxnPin = validate({
	body: Joi.object({
		pin: Joi.string().required().length(4),
	}),
});
