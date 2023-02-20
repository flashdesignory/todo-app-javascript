export const controlsFragment = `
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

export const listFragment = `
<div class="todo-list">
    <ul class="todo-list-ul" title="todos"></ul>
</div>
`;

export const filtersFragment = `
<div class="todo-filters hidden">
    <div class="todo-status"></div>
    <ul class="todo-navigation">
        <li><a href="#/" class="" id="todo-navigation-all">All</a></li>
        <li><a href="#/active" class="" id="todo-navigation-active">Active</a></li>
        <li><a href="#/completed" class="" id="todo-navigation-completed">Completed</a></li>
    </ul>
    <button class="todo-clear-button" disabled>Clear Completed</button>
</div>
`;

export const bodyFragment = `
<div id="root">
    <div class="todo-app">
    <header class="todo-header">
        <h1 class="todo-title">todos</h1>
    </header>
    <main class="todo-main">
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
        <div class="todo-list">
        <ul class="todo-list-ul" title="todos"></ul>
        </div>
        <div class="todo-filters hidden">
        <div class="todo-status"></div>
        <ul class="todo-navigation">
            <li><a href="#/" class="" id="todo-navigation-all">All</a></li>
            <li><a href="#/active" class="" id="todo-navigation-active">Active</a></li>
            <li><a href="#/completed" class="" id="todo-navigation-completed">Completed</a></li>
        </ul>
        <button class="todo-clear-button" disabled>Clear Completed</button>
        </div>
    </main>
    <footer class="todo-footer">
        <p>
        <b>Add a todo:</b><br />
        Enter a todo (at least two characters) and press 'enter'.<br /><br />
        <b>Edit existing todo:</b><br />
        'Double-click' or 'double-tab' to edit a todo.<br /><br />
        <b>Keyboard Navigation:</b><br />
        Use 'tab' & 'tab + shift' to focus elements.<br />
        Use 'space' to toggle and 'enter' to submit.<br />
        </p>
        <p></p>
    </footer>
    </div>
</div>
`;

export const createListFragment = (todos) => `
<div class="todo-list">
    <ul class="todo-list-ul" title="todos">${todos.map((todo) => createListItemFragment(todo))}</ul>
</div>
`;

export const createListItemFragment = (todo) => `
<li class="todo-list-li" id="${todo.id}" data-completed="${todo.completed}" style="display: flex;">
    <div class="todo-item">
        <div class="todo-item-toggle">
            <input id="toggle-${todo.id}" type="checkbox" tabindex="0">
            <label class="visually-hidden" for="toggle-${todo.id}">Toggle for todo item</label>
        </div>
        <div class="todo-item-task">
            <input id="task-${todo.id}" type="text" tabindex="0" readonly="" value="${todo.task}">
            <label class="visually-hidden" for="task-${todo.id}">Todo item</label>
        </div>
        <button class="todo-item-button" tabindex="0">X</button>
    </div>
</li>
`;

export const createBodyFragment = (todos) => `
<main class="todo-main">
    ${controlsFragment}
    ${createListFragment(todos)}
    ${filtersFragment}
</main>
`;
