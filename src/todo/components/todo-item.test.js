import { TodoItem } from "./todo-item.js";
import { oneTodo } from "../test/data.js";
import { editTodoWithClick, editTodoWithKeys } from "../test/snippets.js";

describe("TodoItem", () => {
  const onToggle = jest.fn();
  const onUpdate = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return an item", async () => {
    const todo = { ...oneTodo };
    const item = TodoItem({ todo, onToggle, onUpdate, onDelete });
    document.body.append(item);
    expect(item).toBeTruthy();

    // toggle
    const toggleInput = item.querySelector(`#toggle-${todo.id}`);
    expect(toggleInput).toBeTruthy();
    toggleInput.click();
    expect(onToggle).toHaveBeenCalledTimes(1);

    // input mouse
    const taskInput = item.querySelector(`#task-${todo.id}`);
    expect(taskInput).toBeTruthy();
    expect(taskInput.readOnly).toBeTruthy();
    editTodoWithClick(taskInput, "Clean Car");
    expect(onUpdate).toHaveBeenCalledWith(todo.id, "Clean Car");
    expect(taskInput.readOnly).toBeTruthy();

    // input keyboard
    taskInput.focus();
    editTodoWithKeys(taskInput, "Clean Bus");
    expect(onUpdate).toHaveBeenCalledWith(todo.id, "Clean Bus");
    expect(taskInput.readOnly).toBeTruthy();

    // delete
    const deleteButton = item.querySelector(".todo-item-button");
    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
