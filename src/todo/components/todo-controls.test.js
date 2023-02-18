import { TodoControls } from "./todo-controls";
import { completedTodos } from "../test/data.js";
import { controlsFragment } from "../test/fragments.js";

describe("TodoControls", function () {
  document.body.innerHTML = controlsFragment;

  it("should render", function () {
    const ref = document.querySelector(".todo-controls");
    const getRoute = () => "";
    const getTodos = () => [...completedTodos];
    const onSubmit = (value) => {console.log("value", value)};

    const { update } = TodoControls({ ref, getTodos, getRoute, onSubmit });

    const toggleContainer = document.querySelector(".todo-toggle-container");
    const toggle = document.querySelector("#todo-toggle-element");

    expect(toggleContainer.classList.contains("hidden")).toBeTruthy();
    expect(toggle.checked).toBeFalsy();

    update();

    expect(toggleContainer.classList.contains("hidden")).toBeFalsy();
    expect(toggle.checked).toBeTruthy();

    /* const form = document.querySelector(".todo-form");
    const input = document.querySelector("#todo-input-element");
    input.value = "foo";
    form.submit(); */
  });
});
