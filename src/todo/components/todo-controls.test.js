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

  it("should render.", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...emptyTodos]);

    TodoControls({ ref, getTodos, getRoute, onSubmit });

    const form = document.querySelector(".todo-form");
    const toggle = document.querySelector("#todo-toggle-element");
    expect(form).toBeTruthy();
    expect(toggle).toBeTruthy();
  });

  it("should submit input text", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...emptyTodos]);

    TodoControls({ ref, getTodos, getRoute, onSubmit });

    const form = document.querySelector(".todo-form");
    const input = document.querySelector("#todo-input-element");
    input.value = "foo";
    form.submit();

    expect(onSubmit).toHaveBeenCalledWith("foo");
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
  });
});
