import 'reflect-metadata';

import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';
import { sessionsRouter } from './routes/sessions.routes';
import { appointmentsRouter } from './routes/appointments.routes';
import { usersRouter } from './routes/users.routes';
import uploadConfig from './config/upload';

import './database';
import { AppError } from './errors/AppError';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));
app.use('/sessions', sessionsRouter);
app.use('/appointments', appointmentsRouter);
app.use('/users', usersRouter);
app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
