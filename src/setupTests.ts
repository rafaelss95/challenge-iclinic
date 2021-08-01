import '@testing-library/jest-dom';
import { server } from './servers/test-server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
