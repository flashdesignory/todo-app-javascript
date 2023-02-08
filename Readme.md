# Todo App

## Rendering

Static elements of the of the todo app are hard-coded in the html file to minimize parsing and creation of elements.
Dynamic elements (the todo items) are added to the list element or removed from the list element, without re-rendering the entire list.
Similarely, applying filters will toggle `display:none;` or `display:flex` of the todo items and won't rebuild the list from state.

## State Management

This application uses an in-memory array data structure for the todos.
No persistent storage has been added.

## Keyboard Navigation

As it turns out, Safari does not enable tab highlighting by default. To turn it on:

```bash
Go to “Preferences”
Select the “Advanced” tab
Check “Press Tab to highlight each item on a webpage”
```
