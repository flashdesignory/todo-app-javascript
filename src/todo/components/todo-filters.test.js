import { TodoFilters } from "./todo-filters.js";
import { emptyTodos, mixedTodos, completedTodos, notCompletedTodos, oneTodo } from "../test/data.js";
import { createBodyFragment } from "../test/fragments.js";

describe("TodoFilters", () => {
  const getRoute = jest.fn();
  const getTodos = jest.fn();
  const onClear = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render initial state", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...emptyTodos]);

    TodoFilters({ ref, getTodos, getRoute, onClear });

    const filters = ref.querySelector(".todo-filters");
    const statusDisplay = ref.querySelector(".todo-status");
    const clearButton = ref.querySelector(".todo-clear-button");
    expect(filters).toBeTruthy();
    expect(statusDisplay).toBeTruthy();
    expect(clearButton).toBeTruthy();

    expect(filters.classList.contains("hidden")).toBeTruthy();
    expect(statusDisplay.textContent.length).toBe(0);
    expect(clearButton.disabled).toBeTruthy();
  });

  it("should call onClear", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...mixedTodos]);

    const { update } = TodoFilters({ ref, getTodos, getRoute, onClear });

    update();

    const clearButton = ref.querySelector(".todo-clear-button");
    clearButton.click();
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it("should update display with empty todos", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...emptyTodos]);

    const { update } = TodoFilters({ ref, getTodos, getRoute, onClear });

    update();

    // check display
    const statusDisplay = ref.querySelector(".todo-status");
    expect(statusDisplay.textContent).toEqual("0 items left!");
  });

  it("should update display with one todo", () => {
    document.body.innerHTML = createBodyFragment([{ ...oneTodo }]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([{ ...oneTodo }]);

    const { update } = TodoFilters({ ref, getTodos, getRoute, onClear });

    update();

    // check display
    const statusDisplay = ref.querySelector(".todo-status");
    expect(statusDisplay.textContent).toEqual("1 item left!");
  });

  it("should update display with mixed todos", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...mixedTodos]);

    const { update } = TodoFilters({ ref, getTodos, getRoute, onClear });

    update();

    // check display
    const statusDisplay = ref.querySelector(".todo-status");
    expect(statusDisplay.textContent).toEqual("2 items left!");

    // check active navigation button
    const navigationButton = ref.querySelector("#todo-navigation-all");
    expect(navigationButton.classList.contains("selected")).toBeTruthy();

    // check clear button
    const clearButton = ref.querySelector(".todo-clear-button");
    expect(clearButton.disabled).toBeFalsy();
  });

  it("should update display with completed todos", () => {
    document.body.innerHTML = createBodyFragment([...completedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...completedTodos]);

    const { update } = TodoFilters({ ref, getTodos, getRoute, onClear });

    update();

    // check display
    const statusDisplay = ref.querySelector(".todo-status");
    expect(statusDisplay.textContent).toEqual("0 items left!");

    // check active navigation button
    const navigationButton = ref.querySelector("#todo-navigation-all");
    expect(navigationButton.classList.contains("selected")).toBeTruthy();

    // check clear button
    const clearButton = ref.querySelector(".todo-clear-button");
    expect(clearButton.disabled).toBeFalsy();
  });

  it("should update display with not completed todos", () => {
    document.body.innerHTML = createBodyFragment([...notCompletedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...notCompletedTodos]);

    const { update } = TodoFilters({ ref, getTodos, getRoute, onClear });

    update();

    // check display
    const statusDisplay = ref.querySelector(".todo-status");
    expect(statusDisplay.textContent).toEqual("3 items left!");

    // check active navigation button
    const navigationButton = ref.querySelector("#todo-navigation-all");
    expect(navigationButton.classList.contains("selected")).toBeTruthy();

    // check clear button
    const clearButton = ref.querySelector(".todo-clear-button");
    expect(clearButton.disabled).toBeTruthy();
  });

  it("should update filter buttons on different route", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("active");
    getTodos.mockReturnValue([...mixedTodos]);

    const { update } = TodoFilters({ ref, getTodos, getRoute, onClear });

    update();

    // check active navigation button
    const navigationButton = ref.querySelector("#todo-navigation-active");
    expect(navigationButton.classList.contains("selected")).toBeTruthy();
  });
});
