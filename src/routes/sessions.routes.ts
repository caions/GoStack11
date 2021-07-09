import { Router } from 'express';

import { AuthenticateUserService } from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return res.json({ user, token });
  } catch (error) {
    return res.status(error.statusCode).json({ error: error.message });
  }
});

export { sessionsRouter };
