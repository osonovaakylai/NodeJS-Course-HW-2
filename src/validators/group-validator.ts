import Joi from '@hapi/joi';
import { createValidator } from 'express-joi-validation';

export const validator = createValidator();

export const groupSchema = Joi.object({
  name: Joi.string().required(),
  permissions: Joi.array().items(
    Joi.string().valid(
      'READ',
      'WRITE',
      'DELETE',
      'SHARE',
      'UPLOAD_FILES'
    ),
  )
});
