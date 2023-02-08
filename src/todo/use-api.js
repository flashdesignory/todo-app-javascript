// eslint-disable-next-line no-unused-vars
import { Todo, Partial } from "./types.js";

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
 * @param {Array.<Todo>} initialTodos
 * @returns Methods to interact with the model.
 */
export const useApi = (initialTodos = []) => {
  let todos = [...initialTodos];

  /**
   * Create a new todo and add to state.
   *
   * @param {string} task
   * @returns {Todo} A Todo item.
   */
  const addItem = (task) => {
    const todo = create(task);
    todos = [todo, ...todos];
    return todo;
  };

  /**
   * Update a todo with given input.
   *
   * @param {string} id
   * @param {string} task
   * @returns {Todo} A Todo item.
   */
  const updateItem = (id, task) => {
    let todo;
    todos = todos.map((item) => {
      if (item.id === id) {
        todo = update(item, { task });
        return todo;
      }
      return item;
    });

    return todo;
  };

  /**
   * Remove a Todo from local state.
   *
   * @param {string} id
   */
  const removeItem = (id) => {
    todos = todos.filter((item) => item.id !== id);
  };

  /**
   * Togles a Todo's complete flag.
   *
   * @param {string} id
   * @returns {Todo} A Todo item.
   */
  const toggleItem = (id) => {
    let todo;
    todos = todos.map((item) => {
      if (item.id === id) {
        todo = update(item, { completed: !item.completed });
        return todo;
      }
      return item;
    });

    return todo;
  };

  /**
   * Clears local state.
   */
  const reset = () => {
    todos = [];
  };

  /**
   *
   * @returns {Array.<Todo>} A copy of the state.
   */
  const getTodos = () => {
    return [...todos];
  };

  return { addItem, updateItem, removeItem, toggleItem, reset, getTodos };
};
