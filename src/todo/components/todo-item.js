import { useDoubleClick } from "../hooks/use-doubleclick.js";
import { useKeyListener } from "../hooks/use-keylisteners.js";

export const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  // item setup
  const item = document.createElement("li");
  item.classList.add("todo-list-li");
  item.role = "listitem";
  item.id = `${todo.id}`;
  item.dataset.completed = todo.completed;
  item.dataset.task = todo.task;

  const content = document.createElement("div");
  content.classList.add("todo-item");
  item.append(content);

  // toggle setup
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("todo-item-toggle");

  const toggleInput = document.createElement("input");
  toggleInput.id = `toggle-${todo.id}`;
  toggleInput.type = "checkbox";
  toggleInput.checked = todo.completed;
  toggleInput.tabIndex = 0;
  toggleContainer.append(toggleInput);

  const toggleLabel = document.createElement("label");
  toggleLabel.classList.add("visually-hidden");
  toggleLabel.textContent = "Toggle for todo item";
  toggleLabel.htmlFor = `toggle-${todo.id}`;
  toggleContainer.append(toggleLabel);

  // task setup
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("todo-item-task");

  const taskInput = document.createElement("input");
  taskInput.id = `task-${todo.id}`;
  taskInput.type = "text";
  taskInput.value = todo.task;
  taskInput.tabIndex = 0;
  taskInput.readOnly = true;
  taskContainer.append(taskInput);

  const taskLabel = document.createElement("label");
  taskLabel.classList.add("visually-hidden");
  taskLabel.textContent = "Todo item";
  taskLabel.htmlFor = `task-${todo.id}`;
  taskContainer.append(taskLabel);

  // delete setup
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("todo-item-button");
  deleteButton.textContent = "X";
  deleteButton.tabIndex = 0;

  content.append(toggleContainer, taskContainer, deleteButton);

  // handlers
  const handleChange = () => {
    item.dataset.completed = toggleInput.checked;
    /* istanbul ignore else */
    if (onToggle) onToggle(todo.id);
  };

  const handleDoubleClick = () => {
    taskInput.readOnly = false;
    content.classList.add("editable-item");

    const end = taskInput.value.length;
    taskInput.setSelectionRange(end, end);

    taskInput.focus();
  };

  const resetInput = () => {
    taskInput.readOnly = true;
    content.classList.remove("editable-item");
  };

  const handleBlur = () => {
    if (taskInput.readOnly) return;

    resetInput();

    if (taskInput.value === item.dataset.task) return;

    if (!taskInput.value.length) {
      handleClick();
      return;
    }

    /* istanbul ignore else */
    if (onUpdate) onUpdate(todo.id, taskInput.value);
  };

  const handleEnter = (e) => {
    e.preventDefault();
    taskInput.blur();
  };

  const handleEscape = () => {
    taskInput.value = item.dataset.task;
    resetInput();
  };

  const handleSpace = (e) => {
    if (taskInput.readOnly) {
      e.preventDefault();
      handleDoubleClick();
    }
  };

  const handleClick = () => {
    /* istanbul ignore else */
    if (onDelete) onDelete(todo.id);
  };

  const keyListener = useKeyListener({
    target: taskInput,
    event: "keyup",
    callbacks: {
      ["Enter"]: handleEnter,
      ["Escape"]: handleEscape,
      [" "]: handleSpace,
    },
  });

  // listeners
  toggleInput.addEventListener("change", handleChange);
  taskInput.addEventListener("click", useDoubleClick(handleDoubleClick, 500));
  taskInput.addEventListener("blur", handleBlur);
  deleteButton.addEventListener("click", handleClick);
  keyListener.connect();

  return item;
};
