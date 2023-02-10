/**
 * @typedef {!{id: number, completed: boolean, task: string}}
 */
export var Todo;

/**
 * @typedef {!{completed: boolean, task: string}}
 */
export var Partial;

/**
 * @typedef {{key: string, value: *}}
 */
export var Entry;

/** Storage **/

/**
 * Adds a value to storage.
 *
 * @callback SetValue
 * @param {string} key
 * @param {*} value
 * @param {number|undefined} timeout
 * @returns {Entry | undefined} A key/value pair.
 */
export var SetValue;

/**
 * Deletes a value in storage.
 *
 * @callback DeleteValue
 * @param {string} key
 * @returns {Entry | undefined}
 */
export var DeleteValue;

/**
 * Gets a value if found in storage.
 *
 * @callback GetValue
 * @param {string} key
 * @returns {Entry | undefined}
 */
export var GetValue;

/**
 * Gets all values from storage.
 *
 * @callback GetAllValues
 * @returns {Array<Entry> | undefined}
 */
export var GetAllValues;

/**
 * Remove all values from storage.
 *
 * @callback RemoveAllValues
 * @returns {undefined}
 */
export var RemoveAllValues;

/**
 * Storage interface
 *
 * @typedef {Object}
 * @property {SetValue} setValue
 * @property {DeleteValue} deleteValue
 * @property {GetValue} getValue
 * @property {GetAllValues} getAllValues
 * @property {RemoveAllValues} removeAllValues
 */
export var Storage;
