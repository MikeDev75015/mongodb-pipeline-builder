import { isEmptyObject, isNotEmptyObject, setDefaultValueIfNotProvided } from './utils';

describe('utils', () => {
  describe('setDefaultValueIfNotProvided', () => {
    it('should return default value if value is not provided', () => {
      expect(setDefaultValueIfNotProvided(5)).toBe(5);
    });

    it('should return default value if value is invalid', () => {
      expect(setDefaultValueIfNotProvided(5, undefined)).toBe(5);
    });

    it('should return value if value is not undefined', () => {
      expect(setDefaultValueIfNotProvided('test', '')).toBe('');
    });

    it('should return value if value is provided', () => {
      expect(setDefaultValueIfNotProvided(5, 10)).toBe(10);
    });
  });

  describe('isEmptyObject', () => {
    it('should return true if object is empty', () => {
      expect(isEmptyObject({})).toBe(true);
    });

    it('should return false if object is not empty', () => {
      expect(isEmptyObject({ a: 1 })).toBe(false);
    });
  });

  describe('isNotEmptyObject', () => {
    it('should return false if object is empty', () => {
      expect(isNotEmptyObject({})).toBe(false);
    });

    it('should return true if object is not empty', () => {
      expect(isNotEmptyObject({ a: 1 })).toBe(true);
    });
  });
});
