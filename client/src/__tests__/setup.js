//import { server } from './Server'; // Path may vary
import { cleanup } from '@testing-library/react';
import { beforeAll, afterEach, afterAll } from 'vitest';

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

afterEach(() => {
    cleanup();
})