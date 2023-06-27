export const editTodoWithClick = (element, value) => {
  jest.useFakeTimers();
  element.click();
  jest.advanceTimersByTime(50);
  element.click();
  jest.advanceTimersByTime(50);
  element.value = value;
  element.blur();
  jest.useRealTimers();
};

export const editTodoWithKeys = (element, value) => {
  element.dispatchEvent(new KeyboardEvent("keyup", { key: " " }));
  element.value = value;
  element.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
};
