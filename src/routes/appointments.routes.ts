import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO } from 'date-fns';
import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { CreateAppointmentService } from '../services/CreateAppointmentService';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (req, res) => {
  const { providerId, date } = req.body;
  const parsedDate = startOfHour(parseISO(date));
  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    providerId,
    date: parsedDate,
  });

  return res.json(appointment);
});

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

export { appointmentsRouter };
