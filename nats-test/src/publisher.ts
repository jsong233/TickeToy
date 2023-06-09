import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

// stan is nats backwards, a community convention for client
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      'title': 'concert',
      price: 20
    });
  } catch (err) {
      console.log(err);
  }
  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: 20
  // });
  // // publish the data to the specified channel in NATS streaming server
  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // });
});