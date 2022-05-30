/**
 * Provides helper functions to interact with environment variables.
 *
 * @module
 * @author Marcel Herd
 */

/**
 * Returns the value of the specified environment variable, or the given defaultValue if it doesn't exist.
 * If the specified environment variable does not exist and no defaultValue is provided, it will throw an Error.
 *
 * @param {string} name - the name of the environment variable whose value should be returned
 * @param {string} [defaultValue] - optional default value that will be returned if the specified environment variable does not exist
 * @return {string} the value of the specified environment variable or if it does not exist, the specified default value
 *
 * @throws {@link Error} Will throw an error if the specified environment variable does not exist and no default value is provided
 */
export default function getEnvironmentString(name: string, defaultValue?: string): string {
  const value = process.env[name] ?? defaultValue;
  if (!value) {
    throw new Error(`Required environment variable not set: ${name}`);
  }
  return value;
}

export function getEnvironmentBool(name: string, defaultValue?: boolean): boolean {
  const value = getEnvironmentString(name, String(defaultValue));
  return value === 'true';
}

export function getEnvironmentNumber(name: string, defaultValue?: number): number {
  const value = getEnvironmentString(name, String(defaultValue));
  if (!Number.isNaN(value)) {
    return Number(value);
  }
  throw new Error(`Required environment variable ${name} should be a number: ${value}`);
}
