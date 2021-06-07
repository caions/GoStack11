import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate =
    appointmentsRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'The appointment hour is not available.' });
  }

  const appointment = appointmentsRepository.create(provider, parsedDate);

  return res.json(appointment);
});

appointmentsRouter.get('/', (req, res) => {
  const appointments = appointmentsRepository.all();

  return res.json(appointments);
});

export default appointmentsRouter;
