import * as express from 'express';
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
 router.get('/user', getUsersByParams);
 router.post('/user', validator.body(bodySchema), createUser);
 router.get('/user/:id', getUserById);
 router.put('/user/:id', validator.body(bodySchema), updateUser);
 router.delete('/user/:id', deleteUser);

export default router
