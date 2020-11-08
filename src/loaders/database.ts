import mongoose from 'mongoose';
import config from '../config';
import { IUser } from '../interfaces/user';
import { MOCK_USERS } from '../mockData/user';
import User from '../models/user';

mongoose.connect(config.databaseURL, async (err: any) => {
  if (err) throw err;

  await MOCK_USERS.forEach(
    (user: IUser) => {
      User.create(user);
    },
    (error: any) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connection has been established successfully.');
});

export default db;
