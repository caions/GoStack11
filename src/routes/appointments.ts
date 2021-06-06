import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import { Appointment } from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Array<Appointment> = [];

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointment = new Appointment(provider, parsedDate);

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
