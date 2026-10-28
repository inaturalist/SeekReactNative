const mockErrorHandler = error => {
  console.log( error );
};

export const setJSExceptionHandler = jest
  .fn()
  .mockImplementation( () => mockErrorHandler() );

export const setNativeExceptionHandler = jest
  .fn()
  .mockImplementation( () => mockErrorHandler() );
