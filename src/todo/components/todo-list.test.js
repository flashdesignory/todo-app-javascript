import { TodoList } from "./todo-list.js";
import { emptyTodos, mixedTodos } from "../test/data.js";
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
});
