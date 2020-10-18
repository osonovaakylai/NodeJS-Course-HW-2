import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error('⚠️  Could not find .env file  ⚠️');
}

const secret = 'supersecret'

const corsOptions = {
  origin: 'http://localhost:8080'
};

export default {
  secret,
  corsOptions,
  port: process.env.PORT,
  databasePort: process.env.DB_PORT,
  databaseURL: process.env.DATABASE_URL
};
