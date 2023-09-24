import { validate, Joi } from "express-validation";

export const validateLogin = validate({
	body: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
});

export const validateRegister = validate({
	body: Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
});
