import 'reflect-metadata';

import express from 'express';
import { sessionsRouter } from './routes/sessions.routes';
import { appointmentsRouter } from './routes/appointments.routes';
import { usersRouter } from './routes/users.routes';
import uploadConfig from './config/upload';

import './database';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));
app.use('/sessions', sessionsRouter);
app.use('/appointments', appointmentsRouter);
app.use('/users', usersRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
