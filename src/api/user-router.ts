import * as express from 'express';
import cors from 'cors';
import { validator, bodySchema } from '../validators/user-validator';
import {
  getUsersByParams,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} from '../services/user';

 const router = express.Router();

 router.get('/user', getAllUsers);
 router.get('/user', cors(), getUsersByParams);
 router.post('/user', cors(), validator.body(bodySchema), createUser);
 router.get('/user/:id', cors(), getUserById);
 router.put('/user/:id', cors(), validator.body(bodySchema), updateUser);
 router.delete('/user/:id', cors(), deleteUser);

export default router
