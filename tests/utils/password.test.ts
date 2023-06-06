import { describe, test, expect, afterEach} from '@jest/globals';
import { PasswordUtil } from '../../src/utils/password.util';

describe('PasswordUtil', () => {
    describe('hash', () => {
      test('should return a hashed string', () => {
        const password = 'password123';
        const hash = PasswordUtil.hash(password);
        expect(hash).toEqual(expect.any(String));
        expect(hash.length).toBeGreaterThan(0);
      });
    });
  
    describe('compare', () => {
      test('should return true if the entered password matches the hash', () => {
        const password = 'password123';
        const hash = PasswordUtil.hash(password);
        const result = PasswordUtil.compare(password, hash);
        expect(result).toBe(true);
      });
  
      test('should return false if the entered password does not match the hash', () => {
        const password = 'password123';
        const wrongPassword = 'wrongpassword';
        const hash = PasswordUtil.hash(password);
        const result = PasswordUtil.compare(wrongPassword, hash);
        expect(result).toBe(false);
      });
    });
  });