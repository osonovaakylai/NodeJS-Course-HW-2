import * as express from 'express';
import cors from 'cors';
import { groupSchema } from '../validators/group-validator';
import { validator } from '../validators/user-validator';
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
} from '../services/group';

const router = express.Router();

router.get('/group', cors(), getAllGroups);
router.post('/group', cors(), validator.body(groupSchema), createGroup);
router.get('/group/:id', cors(), getGroupById);
router.put('/group/:id', cors(), validator.body(groupSchema), updateGroup);
router.delete('/group/:id', cors(), deleteGroup);

export default router;
