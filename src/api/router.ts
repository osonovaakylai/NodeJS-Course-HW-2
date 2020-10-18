import * as express from 'express';
import { validator, bodySchema } from '../validators/user-validator';
import {
  getUsersByParams,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers
} from '../services/user';
import { login, logout, checkAPI } from '../services/auth'
import { createGroup, deleteGroup, getAllGroups, getGroupById, updateGroup } from '../services/group';
import { groupSchema } from '../validators/group-validator';
import { getGroupsByUserId, getUsersByGroupId } from '../services/user-group';
import errorHandler from '../middlewares/error-handler';
import checkToken from '../middlewares/check-token';

class Router {
  constructor(server: express.Express) {
    const router = express.Router();

    router.post('/', checkAPI)

    router.post('/login', login)
    router.get('/logout', logout)

    router.get('/users', checkToken, getAllUsers);
    router.get('/user', checkToken, getUsersByParams);
    router.post('/user', checkToken, validator.body(bodySchema), createUser);
    router.get('/user/:id', checkToken, getUserById);
    router.put('/user/:id', checkToken, validator.body(bodySchema), updateUser);
    router.delete('/user/:id', checkToken, deleteUser);

    router.get('/group', checkToken, getAllGroups);
    router.post('/group', checkToken, validator.body(groupSchema), createGroup);
    router.get('/group/:id', checkToken, getGroupById);
    router.put('/group/:id', checkToken, validator.body(groupSchema), updateGroup);
    router.delete('/group/:id', checkToken, deleteGroup);

    router.get('/groups/:userId/user', checkToken, getGroupsByUserId);
    router.get('/users/:groupId/group', checkToken, getUsersByGroupId);

    server.use('/', router);
    server.use(errorHandler)
  }
}

export default Router;
