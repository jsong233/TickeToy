import { Publisher, OrderCancelledEvent, Subjects } from '@jsticketoy/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}