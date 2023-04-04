import { Publisher, Subjects, TicketCreatedEvent } from '@jsticketoy/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}