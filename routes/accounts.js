import express from 'express';
const router = express.Router();
import { promises as fs } from 'fs';

const { readFile, writeFile } = fs;

router.post('/', async (req, res, next) => {
  try {
    let account = req.body;
    const data = JSON.parse(await readFile(global.fileName));

    account = { id: data.nextId++, ...account };
    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(account);

    logger.info(`POST /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    res.send(data);
    logger.info('GET /account');
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const account = data.accounts.find(
      account => account.id === parseInt(req.params.id)
    );
    res.send(account);
    logger.info('GET /account/:id');
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.accounts = data.accounts.filter(
      account => account.id !== parseInt(req.params.id)
    );
    await writeFile(global.fileName, JSON.stringify(data));
    res.send({ message: 'A conta foi excluída com sucesso!' });
    logger.info(`DELETE /account/:id - ${req.params.id}`);
  } catch (err) {
    next(err);
  }
});

router.put('/', async (req, res, next) => {
  try {
    let account = req.body;

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(a => a.id === parseInt(account.id));

    data.accounts[index] = account;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(account);
    logger.info(`PUT /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

router.patch('/updateBalance', async (req, res, next) => {
  try {
    let account = req.body;

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.accounts.findIndex(a => a.id === parseInt(account.id));

    data.accounts[index].balance = account.balance;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(data.accounts[index]);
    logger.info(`PATCH /account - ${JSON.stringify(account)}`);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  console.log(err);
  res.status(400).send({ error: err.message });
});

export default router;
