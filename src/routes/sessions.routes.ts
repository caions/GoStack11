import { Router } from 'express';

import { AuthenticateUserService } from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const user = await authenticateUserService.execute({ email, password });

    return res.json({ user });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

export { sessionsRouter };
