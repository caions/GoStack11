import { Router } from 'express';
import { uuid } from 'uuidv4';

const appointmentsRouter = Router();

interface Appointments {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Array<Appointments> = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  };

  appointments.push(appointment);
  return res.json(appointment);
});

appointmentsRouter.get('/', (req, res) => {
  res.json({ appointments });
});

export default appointmentsRouter;
