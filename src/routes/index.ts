import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Gloria a Deus');
});

export default routes;
