import { TodoControls } from "./todo-controls.js";
import { TodoList } from "./todo-list.js";
import { TodoFilters } from "./todo-filters.js";
import { useApi } from "./use-api.js";
import { useRouter } from "./use-router.js";

export const TodoApp = ({ ref, data = [] }) => {
  const { getTodos, addItem, updateItem, removeItem, toggleItem, clear } = useApi(data);
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

  const handleClear = () => {
    clear();
    clearList();
    updateView();
  };

  const { update: updateControls } = TodoControls({ ref, getTodos, getRoute, onSubmit: handleAdd });
  const { update: updateFilters } = TodoFilters({ ref, getTodos, getRoute, onClear: handleClear });
  const {
    update: updateList,
    clear: clearList,
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
