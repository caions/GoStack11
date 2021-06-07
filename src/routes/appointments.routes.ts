import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { ReadAppointmentService } from '../services/ReadAppointmentService';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = startOfHour(parseISO(date));

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', (req, res) => {
  const readAppointmentService = new ReadAppointmentService(
    appointmentsRepository,
  );

  const appointments = readAppointmentService.execute();

  return res.json(appointments);
});

export default appointmentsRouter;
