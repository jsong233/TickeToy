import { Subjects, Publisher, PaymentCreatedEvent } from '@jsticketoy/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}