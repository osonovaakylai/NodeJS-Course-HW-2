import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

export const validator = createValidator();

export const bodySchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$'))
    .required(),
  age: Joi.number().integer().min(4).max(130).required(),
  isDeleted: Joi.boolean().required()
});
