import mongoose from 'mongoose'
import config from '../config';
import { IUser } from '../interfaces/user';
import { users } from '../mockData/user';
import User from '../models/user';

mongoose.connect(config.databaseURL, (err: any) => {
  if (err) throw err

  users.forEach((user: IUser) => {
    User.create(user)
  }, (error: any) => {
    if (error) {
      console.log(error)
    }
  })
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connection has been established successfully.');
});

export default db
