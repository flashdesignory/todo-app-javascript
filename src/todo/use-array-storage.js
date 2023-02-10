// eslint-disable-next-line no-unused-vars
import { SetValue, DeleteValue, GetValue, GetAllValues, RemoveAllValues } from "./types.js";

export const useArrayStorage = () => {
  let storage = [];

  /**
   * Adds a value to cache.
   *
   * @typedef {SetValue}
   */
  const setValue = (key, value) => {
    const index = storage.findIndex((item) => item.id === key);

    if (index >= 0) {
      storage[index] = value;
      return value;
    }

    storage = [value, ...storage];
    return value;
  };

  /**
   * Deletes a value in cache.
   *
   * @typedef {DeleteValue}
   */
  const deleteValue = (key) => {
    let value;
    storage = storage.filter((item) => {
      if (item.id === key) value = item;
      return item.id !== key;
    });
    return value;
  };

  /**
   * Gets a value if found in cache.
   *
   * @typedef {GetValue}
   */
  const getValue = (key) => {
    const value = storage.find((item) => item.id === key);
    return value;
  };

  /**
   * Gets all values from cache.
   *
   * @typedef {GetAllValues}
   */
  const getAllValues = () => {
    return [...storage];
  };

  /**
   * Remove all values from cache.
   *
   * @typedef {RemoveAllValues}
   */
  const removeAllValues = () => {
    storage = [];
  };

  const toString = () => {
    return [...storage];
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
