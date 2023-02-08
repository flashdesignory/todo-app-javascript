import { TodoItem } from "./todo-item.js";
import { TodoControls } from "./todo-controls.js";
import { TodoFilters } from "./todo-filters.js";
import { useApi } from "./use-api.js";
import { useRouter } from "./use-router.js";

export const TodoApp = ({ ref, data = [] }) => {
  const { getTodos, addItem, updateItem, removeItem, toggleItem, reset } = useApi(data);
  const { initRouter, getRoute } = useRouter();

  // refs
  const list = ref.querySelector(".todo-list-ul");

  // handlers
  const handleToggle = (id) => {
    toggleItem(id);
    updateView();
  };

  const handleUpdate = (id, task) => {
    updateItem(id, task);
    list.focus();
    updateView();
  };

  const handleDelete = (id) => {
    removeItem(id);
    document.getElementById(id).remove();
    updateView();
  };

  const handleAdd = (task) => {
    const todo = addItem(task);
    list.prepend(createItem(todo));
    updateView();
  };

  const handleReset = () => {
    reset();
    list.replaceChildren();
    updateView();
  };

  const { update: updateControls } = TodoControls({ ref, getTodos, getRoute, onSubmit: handleAdd });
  const { update: updateFilters } = TodoFilters({ ref, getTodos, getRoute, onReset: handleReset });

  // helpers
  const createItem = (todo) =>
    TodoItem({
      todo,
      onToggle: handleToggle,
      onUpdate: handleUpdate,
      onDelete: handleDelete,
    });

  const updateView = () => {
    const todos = getTodos();
    const route = getRoute();

    if (updateControls) updateControls();
    if (updateFilters) updateFilters();

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

  // render initial todos
  const todos = getTodos();
  todos.map((todo) => list.append(createItem(todo)));

  // initialize router
  initRouter(updateView);
};
