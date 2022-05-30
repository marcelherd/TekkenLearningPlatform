import getEnvironmentString from '@/helpers/environment';

describe('getEnvironmentString', () => {
  it('should return the value of the environment variable if it exists', () => {
    const foo = getEnvironmentString('FOO');
    expect(foo).toBe<string>('bar');
  });

  it('should return the value of the environment variable if it exists and a default value is provided', () => {
    const foo = getEnvironmentString('FOO', 'defaultValue');
    expect(foo).toBe<string>('bar');
  });

  it('should return the default value if the environment variable does not exist', () => {
    const bar = getEnvironmentString('BAR', 'defaultValue');
    expect(bar).toBe<string>('defaultValue');
  });

  it('should throw an error if the environment variable does not exist and no default value is provided', () => {
    expect(() => getEnvironmentString('BAR')).toThrow('Required environment variable not set: BAR');
  });
});
