import { TodoControls } from "./todo-controls.js";
import { TodoList } from "./todo-list.js";
import { TodoFilters } from "./todo-filters.js";
import { useCache } from "./use-cache.js";
import { useApi } from "./use-api.js";
import { useRouter } from "./use-router.js";

export const TodoApp = ({ ref, data = [] }) => {
  const storage = useCache("todos");
  const { getTodos, addItem, updateItem, removeItem, toggleItem, removeCompletedItems } = useApi(storage, data);
  const { initRouter, getRoute } = useRouter();

  // handlers
  const handleAddItem = (task) => {
    const todo = addItem(task);
    addToList(todo);
    update();
  };

  const handleToggleItem = (id) => {
    toggleItem(id);
    update();
  };

  const handleUpdateItem = (id, task) => {
    updateItem(id, task);
    update();
  };

  const handleDeleteItem = (id) => {
    removeItem(id);
    update();
  };

  const handleRemoveCompletedItems = () => {
    removeCompletedItems();
    removeFromList('[data-completed="true"]');
    update();
  };

  const { update: updateControls } = TodoControls({ ref, getTodos, getRoute, onSubmit: handleAddItem });
  const { update: updateFilters } = TodoFilters({ ref, getTodos, getRoute, onClick: handleRemoveCompletedItems });
  const {
    update: updateList,
    remove: removeFromList,
    add: addToList,
  } = TodoList({ ref, getTodos, getRoute, onToggle: handleToggleItem, onUpdate: handleUpdateItem, onDelete: handleDeleteItem });

  const update = () => {
    updateControls();
    updateFilters();
    updateList();
  };

  // initialize router
  initRouter(update);
};
