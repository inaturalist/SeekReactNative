// Prevent fake timers from leaking between test files sharing a worker.
afterAll( () => {
  jest.useRealTimers();
} );
