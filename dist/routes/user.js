// import * as express from 'express';
// import { v4 as uuid } from 'uuid';
// import cors from 'cors';
// import User from '../types/user';
// import * as Joi from '@hapi/joi';
// import {
//   ContainerTypes,
//   ValidatedRequest,
//   ValidatedRequestSchema,
//   createValidator
// } from 'express-joi-validation';
// class UserRouter {
//     private router: any
//     constructor(server: express.Express) {
//       this.router = express.Router();
//       const validator = createValidator();
//       const bodySchema = Joi.object({
//         login: Joi.string().required(),
//         password: Joi.string()
//           .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$'))
//           .required(),
//         age: Joi.number().integer().min(4).max(130).required(),
//         isDeleted: Joi.boolean().required()
//       });
//       interface UserRequestSchema extends ValidatedRequestSchema {
//         [ContainerTypes.Body]: {
//           login: string;
//           password: string;
//           age: number;
//           isDeleted: boolean;
//         };
//       }
//       const users = new Map<string, User>();
//       users[uuid()] = {
//         login: 'anna',
//         password: 'anna1234',
//         age: 22,
//         isDeleted: false
//       };
//       users[uuid()] = {
//         login: 'olesya',
//         password: 'olesya234',
//         age: 18,
//         isDeleted: false
//       };
//       users[uuid()] = {
//         login: 'dmitriy',
//         password: 'dmitriy1234',
//         age: 42,
//         isDeleted: false
//       };
//       router.get('/', (req: express.Request, res: express.Response) => {
//         res.json({
//           message: 'API works'
//         });
//       });
//       router.get(
//         '/users',
//         cors(),
//         (req: express.Request, res: express.Response) => {
//           const { loginSubstring, limit } = req.query;
//           let filteredObj = {};
//           let counter = 0;
//           if (req.query && limit && loginSubstring) {
//             filteredObj = Object.keys(users).reduce((accumulator, key) => {
//               const isLoginContainsSubstring = users[key].login.includes(
//                 loginSubstring
//               );
//               const isExceedsLimit = counter === Number(limit);
//               if (isLoginContainsSubstring && !isExceedsLimit) {
//                 accumulator[key] = users[key];
//                 counter++;
//               }
//               return accumulator;
//             }, {});
//             res.json({
//               users: filteredObj
//             });
//           } else {
//             res.status(400).send(JSON.stringify({ error: 'Bad request' }));
//           }
//         }
//       );
//       router.get(
//         '/users/:id',
//         cors(),
//         (req: express.Request, res: express.Response) => {
//           if (!!users[req.params.id]) {
//             res.json({
//               user: users[req.params.id]
//             });
//           } else {
//             res.status(404).send(JSON.stringify({ error: 'no such user' }));
//           }
//         }
//       );
//       router.post(
//         '/users',
//         cors(),
//         validator.body(bodySchema),
//         (req: ValidatedRequest<UserRequestSchema>, res: express.Response) => {
//           try {
//             const user: User = {} as User;
//             Object.assign(user, req.body);
//             const newUUID = uuid();
//             users[newUUID] = user;
//             res.json({
//               user: users[newUUID]
//             });
//           } catch (e) {
//             res
//               .status(400)
//               .send(JSON.stringify({ error: 'problem with posted data' }));
//           }
//         }
//       );
//       router.put(
//         '/users/:id',
//         cors(),
//         validator.body(bodySchema),
//         (req: ValidatedRequest<UserRequestSchema>, res: express.Response) => {
//           try {
//             if (!!users[req.params.id]) {
//               const user: User = {} as User;
//               Object.assign(user, req.body);
//               users[req.params.id] = user;
//               res.json({
//                 user: users[req.params.id]
//               });
//             } else {
//               res.status(404).send(JSON.stringify({ error: 'no such user' }));
//             }
//           } catch (e) {
//             res
//               .status(400)
//               .send(JSON.stringify({ error: 'problem with posted data' }));
//           }
//         }
//       );
//       router.delete(
//         '/users/:id',
//         cors(),
//         (req: express.Request, res: express.Response) => {
//           const userToDelete = users[req.params.id];
//           if (!!userToDelete) {
//             const user = { ...userToDelete, isDeleted: true };
//             users[req.params.id] = user;
//             res.json({ user });
//           } else {
//             res.status(404).send(JSON.stringify({ error: 'no such user' }));
//           }
//         }
//       );
//       router.options('*', cors());
//     }
//   }
//   export default UserRouter;
//# sourceMappingURL=user.js.map