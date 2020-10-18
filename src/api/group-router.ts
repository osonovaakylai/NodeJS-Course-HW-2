import * as express from 'express';
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

router.get('/group', getAllGroups);
router.post('/group', validator.body(groupSchema), createGroup);
router.get('/group/:id', getGroupById);
router.put('/group/:id', validator.body(groupSchema), updateGroup);
router.delete('/group/:id', deleteGroup);

export default router;
