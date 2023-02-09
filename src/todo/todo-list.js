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
      element.style.display = shouldShow ? "flex" : "none";
    });
  };

  const reset = () => {
    list.replaceChildren();
  };

  const clear = () => {
    const elementsToRemove = [...ref.querySelectorAll('[data-completed="true"]')];
    elementsToRemove.forEach((element) => element.remove());
  };

  const add = (todo) => {
    list.prepend(createItem(todo));
  };

  // render initial todos
  const todos = getTodos();
  todos.map((todo) => list.append(createItem(todo)));

  return { update, reset, clear, add };
};
