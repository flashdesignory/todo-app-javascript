import { TodoControls } from "./todo-controls";
import { completedTodos, emptyTodos, notCompletedTodos, mixedTodos } from "../test/data.js";
import { createBodyFragment } from "../test/fragments.js";

describe("TodoControls", () => {
  const getRoute = jest.fn();
  const getTodos = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render initial state", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    TodoControls({ ref, getTodos, getRoute, onSubmit });

    const toggleContainer = document.querySelector(".todo-toggle-container");
    expect(toggleContainer.classList.contains("hidden")).toBeTruthy();
  });

  it("should submit input text", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...emptyTodos]);

    TodoControls({ ref, getTodos, getRoute, onSubmit });

    const form = document.querySelector(".todo-form");
    const input = document.querySelector("#todo-input-element");

    // don't call it with only one letter
    input.value = "h";
    form.submit();
    expect(onSubmit).not.toHaveBeenCalled();

    // call it with at least two letters
    input.value = "Do homework.";
    form.submit();
    expect(onSubmit).toHaveBeenCalledWith("Do homework.");
  });

  it("should not check toggle with empty todos", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...emptyTodos]);

    const { update } = TodoControls({ ref, getTodos, getRoute, onSubmit });

    const toggleContainer = document.querySelector(".todo-toggle-container");
    const toggle = document.querySelector("#todo-toggle-element");

    expect(toggleContainer.classList.contains("hidden")).toBeTruthy();
    expect(toggle.checked).toBeFalsy();

    update();

    expect(getRoute).toHaveBeenCalledTimes(1);
    expect(getTodos).toHaveBeenCalledTimes(1);

    expect(toggleContainer.classList.contains("hidden")).toBeTruthy();
    expect(toggle.checked).toBeFalsy();
  });

  it("should not check toggle with incompleted todos", () => {
    document.body.innerHTML = createBodyFragment([...notCompletedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...notCompletedTodos]);

    const { update } = TodoControls({ ref, getTodos, getRoute, onSubmit });

    const toggleContainer = document.querySelector(".todo-toggle-container");
    const toggle = document.querySelector("#todo-toggle-element");

    expect(toggleContainer.classList.contains("hidden")).toBeTruthy();
    expect(toggle.checked).toBeFalsy();

    update();

    expect(getRoute).toHaveBeenCalledTimes(1);
    expect(getTodos).toHaveBeenCalledTimes(1);

    expect(toggleContainer.classList.contains("hidden")).toBeFalsy();
    expect(toggle.checked).toBeFalsy();
  });

  it("should check toggle with completed todos", () => {
    document.body.innerHTML = createBodyFragment([...completedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...completedTodos]);

    const { update } = TodoControls({ ref, getTodos, getRoute, onSubmit });

    const toggleContainer = document.querySelector(".todo-toggle-container");
    const toggle = document.querySelector("#todo-toggle-element");

    expect(toggleContainer.classList.contains("hidden")).toBeTruthy();
    expect(toggle.checked).toBeFalsy();

    update();

    expect(getRoute).toHaveBeenCalledTimes(1);
    expect(getTodos).toHaveBeenCalledTimes(1);

    expect(toggleContainer.classList.contains("hidden")).toBeFalsy();
    expect(toggle.checked).toBeTruthy();
  });

  it("should update toggle state on click", () => {
    document.body.innerHTML = createBodyFragment([...mixedTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...mixedTodos]);

    const { update } = TodoControls({ ref, getTodos, getRoute, onSubmit });

    const toggle = document.querySelector("#todo-toggle-element");

    update();
    expect(toggle.checked).toBeFalsy();

    toggle.click();
    expect(toggle.checked).toBeTruthy();

    toggle.click();
    expect(toggle.checked).toBeFalsy();
  });
});
