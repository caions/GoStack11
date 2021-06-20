import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO } from 'date-fns';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { providerId, date } = req.body;
    const parsedDate = startOfHour(parseISO(date));
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      providerId,
      date: parsedDate,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

export { appointmentsRouter };
