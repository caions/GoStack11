import 'reflect-metadata';

import express from 'express';
import appointmentsRouter from './routes/appointments.routes';

import './database';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/appointments', appointmentsRouter);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
