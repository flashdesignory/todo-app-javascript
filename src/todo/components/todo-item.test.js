import { TodoItem } from "./todo-item.js";
import { oneTodo } from "../test/data.js";

describe("TodoItem", () => {
  const onToggle = jest.fn();
  const onUpdate = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    // fake timers for double click
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
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
    taskInput.click();
    jest.advanceTimersByTime(50);
    taskInput.click();
    jest.advanceTimersByTime(50);
    expect(taskInput.readOnly).toBeFalsy();
    taskInput.textContent = "Clean Car";
    taskInput.blur();
    expect(onUpdate).toHaveBeenCalledWith(todo.id, "Clean Car");
    expect(taskInput.readOnly).toBeTruthy();

    // input keyboard
    taskInput.focus();
    taskInput.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
    expect(taskInput.readOnly).toBeFalsy();
    taskInput.textContent = "Clean Bus";
    taskInput.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
    expect(onUpdate).toHaveBeenCalledWith(todo.id, "Clean Bus");
    expect(taskInput.readOnly).toBeTruthy();

    // delete
    const deleteButton = item.querySelector(".todo-item-button");
    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
