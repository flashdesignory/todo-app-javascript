import { TodoList } from "./todo-list.js";
import { emptyTodos, mixedTodos, newTodo } from "../test/data.js";
import { createBodyFragment } from "../test/fragments.js";

describe("TodoList", () => {
  const getRoute = jest.fn();
  const getTodos = jest.fn();
  const onToggle = jest.fn();
  const onUpdate = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render initial state", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...emptyTodos]);

    TodoList({ ref, getTodos, getRoute, onToggle, onUpdate, onDelete });

    const list = ref.querySelector(".todo-list-ul");
    expect(list).toBeTruthy();
  });

  it("should render initial todos", () => {
    // render empty todo list
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    // return todos
    getTodos.mockReturnValue([...mixedTodos]);

    TodoList({ ref, getTodos, getRoute, onToggle, onUpdate, onDelete });

    const list = ref.querySelector(".todo-list-ul");
    expect(list).toBeTruthy();

    const elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(3);
  });

  it("should only show active todos on update", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("active");
    getTodos.mockReturnValue([...mixedTodos]);

    const { update } = TodoList({ ref, getTodos, getRoute, onToggle, onUpdate, onDelete });

    update();

    const elements = ref.querySelectorAll('.todo-list-li[style*="display: flex"]');
    expect(elements.length).toEqual(2);
  });

  it("should only show completed todos on update", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("completed");
    getTodos.mockReturnValue([...mixedTodos]);

    const { update } = TodoList({ ref, getTodos, getRoute, onToggle, onUpdate, onDelete });

    update();

    const elements = ref.querySelectorAll('.todo-list-li[style*="display: flex"]');
    expect(elements.length).toEqual(1);
  });

  it("should remove completed todos from the list", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...mixedTodos]);

    const { update, remove } = TodoList({ ref, getTodos, getRoute, onToggle, onUpdate, onDelete });

    update();

    // before removal
    let elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(3);

    remove('[data-completed="true"]');

    // after removal
    elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(2);
  });

  it("should add a todo to the list", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...mixedTodos]);

    const { update, add } = TodoList({ ref, getTodos, getRoute, onToggle, onUpdate, onDelete });

    update();

    // before removal
    let elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(3);

    add({ ...newTodo });

    // after removal
    elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(4);
  });

  it("should empty list on reset", () => {
    document.body.innerHTML = createBodyFragment([...emptyTodos]);
    const ref = document.querySelector(".todo-main");

    getRoute.mockReturnValue("");
    getTodos.mockReturnValue([...mixedTodos]);

    const { update, reset } = TodoList({ ref, getTodos, getRoute, onToggle, onUpdate, onDelete });

    update();

    // before removal
    let elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(3);

    reset();

    // after removal
    elements = ref.querySelectorAll(".todo-list-li");
    expect(elements.length).toEqual(0);
  });
});
