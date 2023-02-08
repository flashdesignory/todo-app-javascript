import { TodoControls } from "./todo-controls.js";
import { TodoList } from "./todo-list.js";
import { TodoFilters } from "./todo-filters.js";
import { useApi } from "./use-api.js";
import { useRouter } from "./use-router.js";

export const TodoApp = ({ ref, data = [] }) => {
  const { getTodos, addItem, updateItem, removeItem, toggleItem, reset } = useApi(data);
  const { initRouter, getRoute } = useRouter();

  // handlers
  const handleToggle = (id) => {
    toggleItem(id);
    updateView();
  };

  const handleUpdate = (id, task) => {
    updateItem(id, task);
    updateView();
  };

  const handleDelete = (id) => {
    removeItem(id);
    updateView();
  };

  const handleAdd = (task) => {
    addToList(addItem(task));
    updateView();
  };

  const handleReset = () => {
    reset();
    resetList();
    updateView();
  };

  const { update: updateControls } = TodoControls({ ref, getTodos, getRoute, onSubmit: handleAdd });
  const { update: updateFilters } = TodoFilters({ ref, getTodos, getRoute, onReset: handleReset });
  const {
    update: updateList,
    reset: resetList,
    add: addToList,
  } = TodoList({ ref, getTodos, getRoute, onToggle: handleToggle, onUpdate: handleUpdate, onDelete: handleDelete });

  const updateView = () => {
    updateControls();
    updateFilters();
    updateList();
  };

  // initialize router
  initRouter(updateView);
};
