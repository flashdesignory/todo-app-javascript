import { TodoList } from "./todo-list.js";
import { emptyTodos } from "../test/data.js";
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
});
