import { TodoControls } from "./todo-controls";

describe("TodoControls", function () {
  document.body.innerHTML = `
        <div class="todo-controls">
            <div class="todo-toggle-container hidden">
                <input id="todo-toggle-element" type="checkbox" tabindex="0" />
                <label class="visually-hidden" for="todo-toggle-element">Mark all as complete.</label>
            </div>
            <form class="todo-form">
                <div class="todo-input-container">
                    <label class="visually-hidden" for="todo-input-element">Todo Input</label>
                    <input id="todo-input-element" class="todo-input" type="text" placeholder="What needs to be done?" autofocus autocomplete="off" />
                </div>
            </form>
        </div>
    `;

  it("should render", function () {
    const ref = document.querySelector(".todo-controls");
    const getRoute = () => "";
    const getTodos = () => [
      {
        id: "6a3e2475-dd95-4125-9ca3-614e451169eb",
        task: "Wash Car",
        completed: true,
      },
    ];
    const onSubmit = () => {};

    const { update } = TodoControls({ ref, getTodos, getRoute, onSubmit });

    const toggleContainer = document.querySelector(".todo-toggle-container");
    const toggle = document.querySelector("#todo-toggle-element");

    expect(toggleContainer.classList.contains("hidden")).toBeTruthy();
    expect(toggle.checked).toBeFalsy();

    update();

    expect(toggleContainer.classList.contains("hidden")).toBeFalsy();
    expect(toggle.checked).toBeTruthy();
  });
});
