import * as express from 'express';
import cors from 'cors';
import { validator, bodySchema } from '../validators/user-validator';
import {
  getUsersByParams,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers
} from '../services/user';

class Router {
  constructor(server: express.Express) {
    const router = express.Router();

    router.get('/', getAllUsers);
    router.get('/users', cors(), getUsersByParams);
    router.post('/user/create', cors(), validator.body(bodySchema), createUser);
    router.get('/user/:id', cors(), getUserById);
    router.put('/user/:id', cors(), validator.body(bodySchema), updateUser);
    router.delete('/user/:id', cors(), deleteUser);

    router.options('*', cors());
    server.use('/', router);
  }
}

export default Router;
