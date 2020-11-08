// import { v4 as uuid } from 'uuid';
// import * as express from 'express';
// import { ValidatedRequest } from 'express-joi-validation';
// import { IGroupRequestSchema } from '../interfaces/user';
// import { Group } from '../loaders/database';
// import { SUCCESS_MESSAGE, NOT_FOUND_MESSAGE, ALREADY_EXIST } from '../util/constants';
// import Logger from '../config/logger'
// const logger = new Logger('app')
// export const getAllGroups = async (req: express.Request, res: express.Response, next: any): Promise<any> => {
//   try {
//     const groups = await Group.findAll();
//     res.json({ success: true, message: 'Success', data: groups || [] });
//     logger.info(SUCCESS_MESSAGE)
//   } catch (err) {
//     return next(err)
//   }
// };
// export const getGroupById = async (req: express.Request, res: express.Response, next: any): Promise<any> => {
//   try {
//     const group = await Group.findOne({ where: { id: req.params.id } });
//     if (group) {
//       res.json({
//         success: true,
//         message: 'Success',
//         data: group
//       });
//       logger.info(SUCCESS_MESSAGE)
//     } else {
//       res.json({
//         success: false,
//         message: NOT_FOUND_MESSAGE,
//       });
//       logger.info(NOT_FOUND_MESSAGE)
//     }
//   } catch (err) {
//     return next(err)
//   }
// };
// export const createGroup = async (req: ValidatedRequest<IGroupRequestSchema>, res: express.Response, next: any): Promise<any> => {
//   try {
//     const checkdata = await Group.findOne({ where: { name: req.body.name } });
//     if (checkdata) {
//       res.json({ message: 'Group already exist', data: checkdata });
//       logger.info(ALREADY_EXIST)
//     } else {
//       const newUUID = uuid();
//       const newGroupData = {
//         id: newUUID,
//         name: req.body.name,
//         permissions: req.body.permissions.join(','),
//       };
//       const newGroup = await Group.create(newGroupData, {
//         fields: ['id', 'name', 'permissions']
//       });
//       if (newGroup) {
//         res.json({
//           success: true,
//           message: 'Success',
//           data: newGroup
//         });
//         logger.info(SUCCESS_MESSAGE)
//       }
//     }
//   } catch (err) {
//     return next(err)
//   }
// };
// export const updateGroup = async (req: ValidatedRequest<IGroupRequestSchema>, res: express.Response, next: any): Promise<any> => {
//   try {
//     const group = await Group.findOne({ where: { id: req.params.id } });
//     let response: any;
//     if (group) {
//       await group.update(req.body);
//       response = {
//         success: true,
//         message: 'Success',
//         data: group
//       };
//       logger.info(SUCCESS_MESSAGE)
//     } else {
//       response = {
//         success: false,
//         message: NOT_FOUND_MESSAGE
//       };
//       logger.info(NOT_FOUND_MESSAGE)
//     }
//     return res.json(response);
//   } catch (err) {
//     return next(err)
//   }
// };
// export const deleteGroup = async (req: express.Request, res: express.Response, next: any): Promise<any> => {
//   try {
//     const deletedRowCount = await Group.destroy({ where: { id: req.params.id } });
//     let response: any;
//     if (deletedRowCount === 1) {
//       response = {
//         success: true,
//         message: 'Success'
//       };
//       logger.info(SUCCESS_MESSAGE)
//     } else {
//       response = {
//         success: false,
//         message: NOT_FOUND_MESSAGE
//       };
//       logger.info(NOT_FOUND_MESSAGE)
//     }
//     return res.json(response);
//   } catch (err) {
//     return next(err)
//   }
// };
//# sourceMappingURL=group.js.map