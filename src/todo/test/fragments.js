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
`