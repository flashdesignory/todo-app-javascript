import { TodoApp } from "./todo/todo-app.js";

const data = [
  {
    id: "6a3e2475-dd95-4125-9ca3-614e451169eb",
    task: "Wash Car",
    completed: false,
  },
  {
    id: "d43d436c-0528-496d-b472-212cbba39944",
    task: "Do Dishes",
    completed: true,
  },
];

TodoApp({ ref: document.querySelector("#root"), /* data */ });
