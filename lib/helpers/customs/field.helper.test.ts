import { Field } from './field.helper';

describe('Field', () => {
  it('should create a javascript object', () => {
    expect(Field('unit', 'test')).toEqual({ unit: 'test' });
  });
});
