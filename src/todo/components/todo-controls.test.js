import { TodoControls } from "./todo-controls";
import { completedTodos, emptyTodos } from "../test/data.js";
import { createBodyFragment } from "../test/fragments.js";

describe("TodoControls", () => {
  const getRoute = jest.fn();
  const getTodos = jest.fn();
  const onSubmit = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    document.body.innerHTML = createBodyFragment([]);
  });

  it("should render", () => {
    const ref = document.querySelector(".todo-controls");

    getRoute.mockReturnValueOnce("");
    getTodos.mockReturnValueOnce([...emptyTodos]);

    TodoControls({ ref, getTodos, getRoute, onSubmit });

    const form = document.querySelector(".todo-form");
    const toggle = document.querySelector("#todo-toggle-element");
    expect(form).toBeTruthy();
    expect(toggle).toBeTruthy();
  });

  it("should submit input text", () => {
    const ref = document.querySelector(".todo-controls");

    getRoute.mockReturnValueOnce("");
    getTodos.mockReturnValueOnce([...emptyTodos]);

    TodoControls({ ref, getTodos, getRoute, onSubmit });

    const form = document.querySelector(".todo-form");
    const input = document.querySelector("#todo-input-element");
    input.value = "foo";
    form.submit();

    expect(onSubmit).toHaveBeenCalledWith("foo");
  });

  it("should update toggle button after update", () => {
    const ref = document.querySelector(".todo-controls");

    getRoute.mockReturnValueOnce("");
    getTodos.mockReturnValueOnce([...completedTodos]);

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
});
