import { Joi, validate } from "express-validation";

export const validateTxnPin = validate({
	body: Joi.object({
		pin: Joi.string().required().length(4),
	}),
});

export const validateDonation = validate({
	body: Joi.object({
		amount: Joi.number().required(),
		beneficiaryId: Joi.string().required(),
	}),
});
