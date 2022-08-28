import dotenv from 'dotenv';

dotenv.config({
  path: '../../../../.env',
});

const config = {
  database: {
    path: process.env.DATABASE_URL,
  },
  server: {
    port: process.env.SERVER_PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
};

export default config;
