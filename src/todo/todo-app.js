import { TodoItem } from "./todo-item.js";
import { useApi } from "./use-api.js";
import { useRouter } from "./use-router.js";

export const TodoApp = ({ ref, data = [] }) => {
  const { getTodos, addItem, updateItem, removeItem, toggleItem, reset } = useApi(data);
  const { initRouter, getRoute } = useRouter();

  // refs
  const list = ref.querySelector(".todo-list-ul");
  const form = ref.querySelector(".todo-form");
  const toggle = ref.querySelector("#todo-toggle-element");
  const filters = ref.querySelector(".todo-filters");
  const status = ref.querySelector(".todo-status");
  const clear = ref.querySelector(".todo-clear-button");
  const filterButtons = [...ref.querySelectorAll(".todo-navigation > li > a")];

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

    // hide toggle and filters, if there are no todos
    if (todos.length <= 0) {
      toggle.checked = false;
      toggle.parentElement.classList.add("hidden");

      filters.classList.add("hidden");
      status.textContent = "";
      return;
    }

    // show toggle and filters if there are todos
    toggle.parentElement.classList.remove("hidden");
    filters.classList.remove("hidden");

    const activeTodos = todos.filter((todo) => !todo.completed);
    status.textContent = `${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`;

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

  const updateFilter = () => {
    const name = getRoute();
    filterButtons.forEach((button) => {
      const filterName = button.href.split("/").slice(-1)[0];
      filterName === name ? button.classList.add("selected") : button.classList.remove("selected");
    });

    updateView();
  };

  // input form
  const handleSubmit = (e) => {
    const value = e.target.elements["todo-input-element"].value;
    e.preventDefault();

    if (value === undefined || value.length < 2) return;

    handleAdd(value);

    e.target.reset();
  };

  // controls
  const handleChange = (e) => {
    const completed = e.target.checked;

    getTodos().map((todo) => {
      if (todo.completed !== completed) {
        ref.querySelector(`#toggle-${todo.id}`).click();
      }
    });
    updateView();
  };

  // filters
  const handleClick = () => {
    reset();
    list.replaceChildren();
    updateView();
  };

  // add listeners
  form.addEventListener("submit", handleSubmit);
  toggle.addEventListener("change", handleChange);
  clear.addEventListener("click", handleClick);

  // render initial todos
  const todos = getTodos();
  todos.map((todo) => list.append(createItem(todo)));

  // initialize router
  initRouter(updateFilter);
};
