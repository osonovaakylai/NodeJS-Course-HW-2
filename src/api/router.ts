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
import { createGroup, deleteGroup, getAllGroups, getGroupById, updateGroup } from '../services/group';
import { groupSchema } from '../validators/group-validator';
import { getGroupsByUserId, getUsersByGroupId } from '../services/user-group';

class Router {
  constructor(server: express.Express) {
    const router = express.Router();

    router.get('/', getAllUsers);
    router.get('/users', cors(), getUsersByParams);
    router.post('/user/create', cors(), validator.body(bodySchema), createUser);
    router.get('/user/:id', cors(), getUserById);
    router.put('/user/:id', cors(), validator.body(bodySchema), updateUser);
    router.delete('/user/:id', cors(), deleteUser);

    router.get('/groups', cors(), getAllGroups);
    router.post('/group/create', cors(), validator.body(groupSchema), createGroup);
    router.get('/group/:id', cors(), getGroupById);
    router.put('/group/:id', cors(), validator.body(groupSchema), updateGroup);
    router.delete('/group/:id', cors(), deleteGroup);

    router.get('/groups/:userId/user', cors(), getGroupsByUserId);
    router.get('/users/:groupId/group', cors(), getUsersByGroupId);

    router.options('*', cors());
    server.use('/', router);
  }
}

export default Router;
