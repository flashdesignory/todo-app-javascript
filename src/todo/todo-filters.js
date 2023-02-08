export const TodoFilters = ({ ref, getTodos, getRoute, onReset }) => {
  // refs
  const filters = ref.querySelector(".todo-filters");
  const status = ref.querySelector(".todo-status");
  const clear = ref.querySelector(".todo-clear-button");
  const filterButtons = [...ref.querySelectorAll(".todo-navigation > li > a")];

  const handleClick = () => {
    onReset();
  };

  const update = () => {
    const todos = getTodos();
    const route = getRoute();

    // hide toggle and filters, if there are no todos
    if (todos.length <= 0) {
      filters.classList.add("hidden");
      status.textContent = "";
      return;
    }

    // show filters
    filters.classList.remove("hidden");

    filterButtons.forEach((button) => {
      const filterName = button.href.split("/").slice(-1)[0];
      filterName === route ? button.classList.add("selected") : button.classList.remove("selected");
    });

    // update status text
    const activeTodos = todos.filter((todo) => !todo.completed);
    status.textContent = `${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`;
  };

  // add listeners
  clear.addEventListener("click", handleClick);

  return { update };
};
