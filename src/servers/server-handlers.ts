import { rest } from 'msw';

function randomFrom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export const handlers = [
  rest.get(/\/people\/1/, async (_, response, context) => {
    return response(
      context.delay(randomFrom(0, 1000)),
      context.json({ name: 'Luke Skywalker' }),
    );
  }),
  rest.get(/\/people\/4/, async (_, response, context) => {
    return response(
      context.delay(randomFrom(0, 1000)),
      context.json({ name: 'Darth Vader' }),
    );
  }),
];
