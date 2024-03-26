import * as Joi from "joi";

export const JoiValidationSchema = Joi.object({
  PORT: Joi.required().default(3000),
  DB_HOST: Joi.required(),
  DB_PORT: Joi.number().default(5432),
  DB_NAME: Joi.required(),
  DB_USER: Joi.required().default("postgres"),
  DB_PASS: Joi.required(),
});
