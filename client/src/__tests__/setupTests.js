// setupTests.js
import { server } from './Server';
import { beforeAll, afterAll, afterEach } from 'vitest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
