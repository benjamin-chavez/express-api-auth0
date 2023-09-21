// src/routes/index.ts

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import listEndpoints from 'express-list-endpoints';
import app from '../app';

const router = Router();

/**
 * @description:    Fetch Root
 * @route:          GET /api
 * @access:         Public
 */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.status(200).send('Server Running...');
  })
);

router.get('/routes', (req, res) => {
  res.status(200).send(listEndpoints(app));
});

export default router;
