export const TodoControls = ({ ref, getTodos, getRoute, onSubmit }) => {
  // refs
  const form = ref.querySelector(".todo-form");
  const toggle = ref.querySelector("#todo-toggle-element");

  // handlers
  const handleSubmit = (e) => {
    const value = e.target.elements["todo-input-element"].value;
    e.preventDefault();

    if (value === undefined || value.length < 2) return;

    onSubmit(value);

    e.target.reset();
  };

  const handleChange = (e) => {
    const completed = e.target.checked;

    getTodos().map((todo) => {
      if (todo.completed !== completed) {
        ref.querySelector(`#toggle-${todo.id}`).click();
      }
    });
  };

  // methods
  const update = () => {
    const todos = getTodos();
    const route = getRoute();

    // hide toggle and filters, if there are no todos
    if (todos.length <= 0) {
      toggle.checked = false;
      toggle.parentElement.classList.add("hidden");
      return;
    }

    // show toggle and update toggle state
    const visibleTodos = todos.filter((todo) => {
      if (route === "active") return !todo.completed;
      if (route === "completed") return todo.completed;
      return todo;
    });
    toggle.checked = visibleTodos.length > 0 && visibleTodos.every((todo) => todo.completed);
    toggle.parentElement.classList.remove("hidden");
  };

  // add listeners
  form.addEventListener("submit", handleSubmit);
  toggle.addEventListener("change", handleChange);

  return { update };
};
