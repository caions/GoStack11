import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO } from 'date-fns';

const appointmentsRouter = Router();

interface Appointments {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Array<Appointments> = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  };

  appointments.push(appointment);
  return res.json(appointment);
});

appointmentsRouter.get('/', (req, res) => {
  res.json({ appointments });
});

export default appointmentsRouter;
