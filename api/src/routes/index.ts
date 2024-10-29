import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @openapi
 * /api/healthz:
 *   get:
 *     description: Responds for a health check status
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/healthz', (req: Request, res: Response) => {
  res.json({ status: 'UP' });
});

export default router;
