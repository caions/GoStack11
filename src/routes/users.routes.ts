import { Router } from 'express';

import { CreateUserService } from '../services/CreateUsertService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return res.json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

export default usersRouter;
