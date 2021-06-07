import { isEqual } from 'date-fns';
import { Appointment } from '../models/Appointment';

interface Error {
  message: string;
}

export class AppointmentsRepository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date): Appointment | Error {
    const appointment = new Appointment(provider, date);
    this.appointments.push(appointment);
    return appointment;
  }

  public findByDate(date: Date): Appointment | undefined {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment;
  }

  public all(): Array<Appointment> {
    return this.appointments;
  }
}
