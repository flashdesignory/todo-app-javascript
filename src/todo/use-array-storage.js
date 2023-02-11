// eslint-disable-next-line no-unused-vars
import { SetValue, DeleteValue, GetValue, GetAllValues, RemoveAllValues } from "./types.js";

const storage = [];
const defaultNameSpace = "default";

export const useArrayStorage = (namespace = defaultNameSpace) => {
  if (!storage[namespace]) {
    storage[namespace] = [];
  }

  /**
   * @type {SetValue}
   */
  const setValue = (key, value) => {
    const index = storage[namespace].findIndex((item) => item.id === key);

    if (index >= 0) {
      storage[namespace][index] = value;
      return value;
    }

    storage[namespace] = [value, ...storage[namespace]];
    return value;
  };

  /**
   * @type {DeleteValue}
   */
  const deleteValue = (key) => {
    let value;
    storage[namespace] = storage[namespace].filter((item) => {
      if (item.id === key) value = item;
      return item.id !== key;
    });
    return value;
  };

  /**
   * @type {GetValue}
   */
  const getValue = (key) => {
    const value = storage[namespace].find((item) => item.id === key);
    return value;
  };

  /**
   * @type {GetAllValues}
   */
  const getAllValues = () => {
    return [...storage[namespace]];
  };

  /**
   * @type {RemoveAllValues}
   */
  const removeAllValues = () => {
    storage[namespace] = [];
  };

  const toString = () => {
    return [...storage[namespace]];
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
