import express from 'express';
import accountsRouter from './routes/accounts.js';
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

const app = express();
app.use(express.json());

app.use('/account', accountsRouter);

app.listen(3000, async () => {
  try {
    await readFile('account.json');
    console.log('API Started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile('account.json', JSON.stringify(initialJson))
      .then(() => {
        console.log('API Started and File Created!');
      })
      .catch(err => {
        console.log(err);
      });
  }
});
