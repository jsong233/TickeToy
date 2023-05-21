import { Subjects, Publisher, ExpirationCompleteEvent } from '@jsticketoy/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}