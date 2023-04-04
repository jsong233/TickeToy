import { Publisher, Subjects, TicketUpdatedEvent } from '@jsticketoy/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}