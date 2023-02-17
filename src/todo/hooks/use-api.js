// eslint-disable-next-line no-unused-vars
import { Todo, Partial, Storage } from "../types/types.js";

/**
 * Function that returns a unique string.
 *
 * @returns {string} A unique id.
 */
const uuid = () => crypto.randomUUID();

/**
 * Function that creates a todo, based on the task input.
 *
 * @param {string} task
 * @returns {Todo} A Todo item.
 */
const create = (task) => ({
  id: uuid(),
  task,
  completed: false,
});

/**
 * Function that updates a todo with a Partial.
 *
 * @param {Todo} item
 * @param {Partial} partial
 * @returns {Todo} A Todo item.
 */
const update = (item, { task, completed }) => ({
  ...item,
  task: task === undefined ? item.task : task,
  completed: completed === undefined ? item.completed : completed,
});

/**
 * Model of the api.
 *
 * @param {Storage} storage
 * @param {Array<Todo>} initialTodos
 * @returns Methods to interact with the model.
 */
export const useApi = (storage, initialTodos = []) => {
  // assign initial todos, if passed in
  initialTodos.forEach((todo) => storage.setValue(todo.id, todo));

  /**
   * Create a new todo and add to state.
   *
   * @param {string} task
   * @returns {Todo} A Todo item.
   */
  const addItem = (task) => {
    const todo = create(task);
    storage.setValue(todo.id, todo);
    return todo;
  };

  /**
   * Update a todo with given input.
   *
   * @param {string} id
   * @param {string} task
   * @returns {Todo | undefined} A Todo item.
   */
  const updateItem = (id, task) => {
    let todo = storage.getValue(id);
    if (!todo) return;

    todo = update(todo, { task });
    storage.setValue(todo.id, todo);
    return todo;
  };

  /**
   * Remove a Todo from local state.
   *
   * @param {string} id
   * @returns {Todo | undefined} A Todo item.
   */
  const removeItem = (id) => {
    const todo = storage.deleteValue(id);
    return todo;
  };

  /**
   * Togles a Todo's complete flag.
   *
   * @param {string} id
   * @returns {Todo | undefined} A Todo item.
   */
  const toggleItem = (id) => {
    let todo = storage.getValue(id);
    if (!todo) return;

    todo = update(todo, { completed: !todo.completed });
    storage.setValue(todo.id, todo);
    return todo;
  };

  /**
   * Removes all items.
   */
  const removeAllItems = () => {
    storage.removeAllValues();
  };

  /**
   * Removes all completed items.
   */
  const removeCompletedItems = () => {
    getTodos().forEach((todo) => {
      if (todo.completed) storage.deleteValue(todo.id);
    });
  };

  /**
   *
   * @returns {Array.<Todo>} A copy of the state.
   */
  const getTodos = () => {
    return [...storage.getAllValues()];
  };

  return { addItem, updateItem, removeItem, toggleItem, removeAllItems, removeCompletedItems, getTodos };
};
