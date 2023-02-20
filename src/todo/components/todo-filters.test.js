import { TodoFilters } from "./todo-filters.js";
import { emptyTodos } from "../test/data.js";
import { createBodyFragment } from "../test/fragments.js";

describe("TodoFilters", () => {
  const getRoute = jest.fn();
  const getTodos = jest.fn();
  const onClick = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render initial state", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...emptyTodos]);

    TodoFilters({ ref, getTodos, getRoute, onClick });

    const filters = ref.querySelector(".todo-filters");
    const statusDisplay = ref.querySelector(".todo-status");
    const clearButton = ref.querySelector(".todo-clear-button");
    const filterButtons = [...ref.querySelectorAll(".todo-navigation > li > a")];
    expect(filters).toBeTruthy();
    expect(statusDisplay).toBeTruthy();
    expect(clearButton).toBeTruthy();
    expect(filterButtons).toBeTruthy();

    expect(filters.classList.contains("hidden")).toBeTruthy();
    expect(statusDisplay.textContent.length).toBe(0);
    expect(clearButton.disabled).toBeTruthy();
  });
});
