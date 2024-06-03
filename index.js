import express from 'express';
import winston from 'winston';
import cors from 'cors';
import accountsRouter from './routes/account.routes.js';
import { promises as fs } from 'fs';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './doc.js';
import pkg from 'graphql';
import { graphqlHTTP } from 'express-graphql';
//import AccountService from './services/account.service.js';
import Schema from './schema/index.js';

const { buildSchema } = pkg;
const { readFile, writeFile } = fs;

global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/account', accountsRouter);
app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    //rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info('API Started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        logger.info('API Started and File Created!');
      })
      .catch(err => {
        logger.error(err);
      });
  }
});
