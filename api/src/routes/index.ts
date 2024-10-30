import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

/**
 * @openapi
 * /api/healthz:
 *   get:
 *     description: Responds for a health check status
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/healthz', (req: Request, res: Response) => {
  res.json({ status: 'UP', env: process?.env?.NODE_ENV ?? 'local' });
});

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     description: Get a list of tasks
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/tasks', (req: Request, res: Response) => {
  const jsonPath = path.join(__dirname, 'data.json');
  fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading the file' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

export default router;
