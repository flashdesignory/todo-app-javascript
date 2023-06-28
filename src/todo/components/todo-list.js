import { TodoItem } from "./todo-item.js";

export const TodoList = ({ ref, getTodos, getRoute, onToggle, onUpdate, onDelete }) => {
  // refs
  const list = ref.querySelector(".todo-list-ul");

  // handlers
  const handleToggle = (id) => {
    onToggle(id);
  };

  const handleUpdate = (id, task) => {
    list.focus();
    onUpdate(id, task);
  };

  const handleDelete = (id) => {
    document.getElementById(id).remove();
    onDelete(id);
  };

  // methods
  const createItem = (todo) =>
    TodoItem({
      todo,
      onToggle: handleToggle,
      onUpdate: handleUpdate,
      onDelete: handleDelete,
    });

  const update = () => {
    const todos = getTodos();
    const route = getRoute();

    // update todos to show (depending on filter)
    todos.forEach((todo) => {
      const element = document.getElementById(todo.id);
      let shouldShow = true;
      switch (route) {
        case "active":
          shouldShow = !todo.completed;
          break;
        case "completed":
          shouldShow = todo.completed;
          break;
        default:
          shouldShow = true;
      }

      // update task if it changed
      /* istanbul ignore else */
      if (element.dataset.task !== todo.task) {
        element.dataset.task = todo.task;
      }

      element.style.display = shouldShow ? "flex" : "none";
    });
  };

  const reset = () => {
    list.replaceChildren();
  };

  const remove = (filter) => {
    const elementsToRemove = [...ref.querySelectorAll(filter)];
    elementsToRemove.forEach((element) => element.remove());
  };

  const add = (todo) => {
    list.prepend(createItem(todo));
  };

  return { update, reset, remove, add };
};
