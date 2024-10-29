import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @openapi
 * /api/hello:
 *   get:
 *     description: Responds with a greeting message
 *     responses:
 *       200:
 *         description: A greeting message
 */
router.get('/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express with TypeScript!' });
});

export default router;
