export const TodoFilters = ({ ref, getTodos, getRoute, onClick }) => {
  // refs
  const filters = ref.querySelector(".todo-filters");
  const statusDisplay = ref.querySelector(".todo-status");
  const clearButton = ref.querySelector(".todo-clear-button");
  const filterButtons = [...ref.querySelectorAll(".todo-navigation > li > a")];

  // handlers
  const handleClick = () => {
    onClick();
  };

  // methods
  const update = () => {
    const todos = getTodos();
    const route = getRoute();

    // hide filters if there are no todos
    if (todos.length <= 0) {
      filters.classList.add("hidden");
      statusDisplay.textContent = "0 items left!";
      clearButton.disabled = true;
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
    statusDisplay.textContent = `${activeTodos.length} ${activeTodos.length === 1 ? "item" : "items"} left!`;

    // update clearButton
    clearButton.disabled = activeTodos.length === todos.length;
  };

  // add listeners
  clearButton.addEventListener("click", handleClick);

  return { update };
};
