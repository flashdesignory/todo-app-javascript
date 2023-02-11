// eslint-disable-next-line no-unused-vars
import { SetValue, DeleteValue, GetValue, GetAllValues, RemoveAllValues } from "./types.js";

export const useArrayStorage = () => {
  let storage = [];

  /**
   * @type {SetValue}
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
   * @type {DeleteValue}
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
   * @type {GetValue}
   */
  const getValue = (key) => {
    const value = storage.find((item) => item.id === key);
    return value;
  };

  /**
   * @type {GetAllValues}
   */
  const getAllValues = () => {
    return [...storage];
  };

  /**
   * @type {RemoveAllValues}
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
