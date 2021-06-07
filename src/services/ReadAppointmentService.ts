import { AppointmentsRepository } from '../repositories/AppointmentsRepository';

export class ReadAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentRepository;
  }
  public execute() {
    return this.appointmentsRepository.all();
  }
}
