// eslint-disable-next-line no-unused-vars
import { SetValue, DeleteValue, GetValue, GetAllValues, RemoveAllValues } from "./types.js";

const cache = {};
const defaultNameSpace = "default";

const expired = (expiresAt) => expiresAt && expiresAt < Date.now();

/**
 * useCache
 * This hook implements an in-memory cache that supports expiration of key/value pairs.
 * The namespace param creates a unique namespaces.
 *
 * @param {string} namespace
 * @returns Methods to interact with useCache.
 */
export const useCache = (namespace = defaultNameSpace) => {
  if (!cache[namespace]) {
    cache[namespace] = {};
  }

  /**
   * @type {SetValue}
   */
  const setValue = (key, value, timeout) => {
    const expiresAt = timeout ? Date.now() + timeout : null;
    cache[namespace][key] = { value, expiresAt };
    return value;
  };

  /**
   * @type {DeleteValue}
   */
  const deleteValue = (key) => {
    const value = cache[namespace][key];

    if (value === undefined) return undefined;

    delete cache[namespace][key];
    return value;
  };

  /**
   * @type {GetValue}
   */
  const getValue = (key) => {
    const { value, expiresAt } = cache[namespace][key] || {};
    if (expired(expiresAt)) {
      deleteValue(key);
      return undefined;
    }

    return value;
  };

  /**
   * @type {GetAllValues}
   */
  const getAllValues = () => {
    const entries = Object.values(cache[namespace]);
    if (!entries) return undefined;

    const values = entries.map((entry) => entry.value);
    return values;
  };

  /**
   * @type {RemoveAllValues}
   */
  const removeAllValues = () => {
    Object.keys(cache[namespace]).forEach((key) => delete cache[namespace][key]);
  };

  /**
   * Checks if an entry has an expiration.
   *
   * Null values represent no expiration.
   * Zero (0) represents an expired entry.
   *
   * @param {string} key
   * @returns Evaluated expiration
   */
  const timeTillExpiration = (key) => {
    const { expiresAt } = cache[namespace][key] || {};

    if (!expiresAt) {
      return null;
    }

    if (expired(expiresAt)) {
      return 0;
    }

    return expiresAt - Date.now();
  };

  const toString = () => {
    return { ...cache[namespace] };
  };

  return {
    setValue,
    deleteValue,
    getValue,
    getAllValues,
    removeAllValues,
    timeTillExpiration,
    toString,
  };
};
