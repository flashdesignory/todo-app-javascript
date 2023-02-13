# Todo App

## Preview

https://flashdesignory.github.io/todo-app-javascript/

## Description

A to-do application allows a user to keep track of tasks that need to get done. The user can enter a new task, update an existing task, mark a task as completed, or delete a task. In addition to the basic CRUD operations, the TodoMVC app has some added functionality. The user can select or deselect the currently visible tasks and has the option to remove all completed tasks entirely. In addition, filters are available to change the view to “all”, “active” or “completed” tasks. A status text displays the number of active tasks to complete. 

## Architectural design

This application uses JavaScript modules to create a modular system that composes visual and behavioral elements together.
Functional components have been favored over class (or prototype) based components to minimize overhead of creating instances.
Although functional components and class components can achieve similar functionality, the nature of JavaScript modules lends itself to opt into a module design pattern.

In general, a functional component is a JavaScript function which accepts props as an argument and returns methods to interact with.
Visual functional components are elements that are visible to the user and that the user can interact with.
Behavioral functional compponents add functionality to visual components, which promotes separation of concerns.

## Rendering

Static elements of the of the todo app are hard-coded in the html file to minimize parsing and creation of elements.
Dynamic elements (the todo items) are added to the list element or removed from the list element, without re-rendering the entire list.
Similarely, applying filters will toggle `display:none;` or `display:flex` of the todo items and won't rebuild the list from state.

## State Management

This application uses an in-memory object data structure for the todos.
No persistent storage has been added.

## Keyboard Navigation

As it turns out, Safari does not enable tab highlighting by default. To turn it on:

```bash
Go to “Preferences”
Select the “Advanced” tab
Check “Press Tab to highlight each item on a webpage”
```
