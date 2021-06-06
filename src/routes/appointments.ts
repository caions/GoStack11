import { Router } from 'express';
import { v4 } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Array<Appointment> = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointment = {
    id: v4(),
    provider,
    date: parsedDate,
  };

  const findAppointmentInSameDate = appointments.find(x =>
    isEqual(x.date, parsedDate),
  );

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'The appointment hour is not available.' });
  }

  appointments.push(appointment);

  return res.json(appointment);
});

appointmentsRouter.get('/', (req, res) => {
  res.json({ appointments });
});

export default appointmentsRouter;
