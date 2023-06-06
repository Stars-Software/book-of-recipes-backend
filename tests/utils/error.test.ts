import { describe, test, expect } from '@jest/globals';
import { CustomError } from '../../src/utils/error.util';

describe('CustomError', () => {
  test('should create an instance of CustomError', () => {
    const error = new CustomError(404, 'Not Found');
    expect(error instanceof CustomError).toBeTruthy();
  });

  test('should set the correct properties', () => {
    const status = 500;
    const message = 'Internal Server Error';
    const code = 1001;

    const error = new CustomError(status, message, code);

    expect(error.status).toBe(status);
    expect(error.message).toBe(message);
    expect(error.code).toBe(code);
  });

  test('should have the correct name', () => {
    const error = new CustomError(400, 'Bad Request');
    expect(error.name).toBe('Server Error');
  });

  test('should capture stack trace', () => {
    const error = new CustomError(500, 'Internal Server Error');
    expect(error.stack).toBeDefined();
  });
});
