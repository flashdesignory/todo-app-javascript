// eslint-disable-next-line no-unused-vars
import { SetValue, DeleteValue, GetValue, GetAllValues, RemoveAllValues } from "../types/types.js";

const cache = {};
const defaultNameSpace = "default";

/**
 * useStorage
 * This hook implements an in-memory cache that supports expiration of key/value pairs.
 * The namespace param creates a unique namespaces.
 *
 * @param {string} namespace
 * @returns Methods to interact with useStorage.
 */
export const useStorage = (namespace = defaultNameSpace) => {
  /* istanbul ignore else */
  if (!cache[namespace]) {
    cache[namespace] = {};
  }

  /**
   * @type {SetValue}
   */
  const setValue = (key, value) => {
    cache[namespace][key] = value;
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
    const value = cache[namespace][key];
    return value;
  };

  /**
   * @type {GetAllValues}
   */
  const getAllValues = () => {
    const values = Object.values(cache[namespace]);
    return values;
  };

  /**
   * @type {RemoveAllValues}
   */
  const removeAllValues = () => {
    Object.keys(cache[namespace]).forEach((key) => delete cache[namespace][key]);
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
    toString,
  };
};
