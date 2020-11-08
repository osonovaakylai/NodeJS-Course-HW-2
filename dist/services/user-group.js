// import * as express from 'express';
// import { Group, User } from '../loaders/database';
// import Logger from '../config/logger'
// import { ID_NOT_PROVIDED, SUCCESS_MESSAGE } from '../util/constants';
// const logger = new Logger('app')
// // find groups by given user
// export const getGroupsByUserId = async (
//   req: express.Request,
//   res: express.Response,
//   next: any
// ): Promise<any> => {
//   try {
//     if (req.params.userId) {
//       const groups = await Group.findAll({
//         include: [
//             User,
//             { model: User, where: { id: req.params.userId } },
//         ],
//       });
//       res.json({ success: true, message: 'Success', data: groups || [] });
//       logger.info(SUCCESS_MESSAGE)
//     } else {
//       res.status(500).json({ success: false, message: ID_NOT_PROVIDED });
//       logger.error(ID_NOT_PROVIDED, { success: false })
//     }
//   } catch (err) {
//     return next(err)
//   }
// };
// // find users belonging to group
// export const getUsersByGroupId = async (
//   req: express.Request,
//   res: express.Response,
//   next: any
// ): Promise<any> => {
//   try {
//     if (req.params.groupId) {
//       const users = await User.findAll({
//         include: [
//           Group,
//           { model: Group, where: { id: req.params.groupId } },
//         ],
//       });
//       res.json({ success: true, message: 'Success', data: users || [] });
//       logger.info(SUCCESS_MESSAGE)
//     } else {
//       res.status(500).json({ success: false, message: ID_NOT_PROVIDED });
//       logger.error(ID_NOT_PROVIDED, { success: false })
//     }
//   } catch (err) {
//     return next(err)
//   }
// };
//# sourceMappingURL=user-group.js.map