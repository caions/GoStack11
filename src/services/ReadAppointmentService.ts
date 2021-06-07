import { AppointmentsRepository } from '../repositories/AppointmentsRepository';
import { Appointment } from '../models/Appointment';

export class ReadAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentRepository;
  }
  public execute(): Array<Appointment> {
    return this.appointmentsRepository.all();
  }
}
