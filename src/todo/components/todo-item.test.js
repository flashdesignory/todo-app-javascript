import { TodoItem } from "./todo-item.js";
import { oneTodo } from "../test/data.js";

describe("TodoItem", () => {
  const onToggle = jest.fn();
  const onUpdate = jest.fn();
  const onDelete = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return an item", () => {
    const item = TodoItem({ todo: oneTodo[0], onToggle, onUpdate, onDelete });
    expect(item).toBeTruthy();
  });
});
