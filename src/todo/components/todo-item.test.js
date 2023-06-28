import { TodoItem } from "./todo-item.js";
import { oneTodo } from "../test/data.js";
import { editTodoWithClick, editTodoWithKeys, setTodoValueWithKeys } from "../test/snippets.js";

describe("TodoItem", () => {
  const onToggle = jest.fn();
  const onUpdate = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return an item", () => {
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

  it("should not update an item on escape key pressed", () => {
    const todo = { ...oneTodo };
    const item = TodoItem({ todo, onToggle, onUpdate, onDelete });
    document.body.append(item);
    // input keyboard
    const taskInput = item.querySelector(`#task-${todo.id}`);
    taskInput.focus();
    expect(taskInput.value).toEqual("Wash Car");
    setTodoValueWithKeys(taskInput, "Clean Bus");
    expect(taskInput.value).toEqual("Clean Bus");
    taskInput.dispatchEvent(new KeyboardEvent("keyup", { key: "Escape" }));
    expect(taskInput.value).toEqual("Wash Car");
    expect(onUpdate).not.toHaveBeenCalledWith(todo.id, "Clean Bus");
    expect(taskInput.readOnly).toBeTruthy();
  });

  it("should remove an item if value set is an empty string", () => {
    const todo = { ...oneTodo };
    const item = TodoItem({ todo, onToggle, onUpdate, onDelete });
    document.body.append(item);
    // input keyboard
    const taskInput = item.querySelector(`#task-${todo.id}`);
    taskInput.focus();
    editTodoWithKeys(taskInput, "");
    expect(onUpdate).not.toHaveBeenCalled();
    expect(onDelete).toHaveBeenCalled();
    expect(taskInput.readOnly).toBeTruthy();
  });

  it("should not call update if nothing changed after input", () => {
    const todo = { ...oneTodo };
    const item = TodoItem({ todo, onToggle, onUpdate, onDelete });
    document.body.append(item);
    // input keyboard
    const taskInput = item.querySelector(`#task-${todo.id}`);
    taskInput.focus();
    editTodoWithKeys(taskInput, "Wash Car");
    expect(onUpdate).not.toHaveBeenCalled();
    expect(taskInput.readOnly).toBeTruthy();
  });
});
