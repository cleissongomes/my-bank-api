import { log } from 'console';
import express from 'express';
import { promises as fs } from 'fs';
import AccountController from '../controllers/account.controller.js';

const { readFile, writeFile } = fs;

const router = express.Router();

router.post('/', AccountController.createAccount);
router.get('/', AccountController.getAccounts);
router.get('/:id', AccountController.getAccount);
router.delete('/:id', AccountController.deleteAccount);
router.put('/', AccountController.updateAccount);
router.patch('/updateBalance', AccountController.updateBalance);

router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  console.log(err);
  res.status(400).send({ error: err.message });
});

export default router;
