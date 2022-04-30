<script lang='ts'>
  import { theme } from '$lib/global-state';
  import TodoIcon from '$lib/components/icons/todo-icon.svelte';

  import ActionIcon from '$lib/components/icons/action-icon.svelte';
  import type { Todo } from './interface';

  export let completeTodo: (_id: string, completed: boolean) => void;
  export let setSelectedDeleteTodo: (todo: Todo) => void;
  export let setSelectedEditTodo: (todo: Todo) => void;
  export let todo: Todo;

  let todoClasses = '';

  $: {
    todoClasses = `cstm_todo-label ${
      todo.completed ? 'cstm_todo-label_complete' : 'cstm_todo-label_incomplete'
    } ${'col d-flex align-items-center fs-5 w-100 p-3'}`;
  }
</script>

<li
  class={`cstm_todo-item list-group-item list-group-item-action d-flex p-0 ${$theme.textClass}`}
  >
  <div class="flex-grow-1">
    <input
      id={todo._id}
      class="cstm_form-check form-check-input visually-hidden"
      type="checkbox"
      checked={todo.completed}
      on:change={(event) => {
        completeTodo(todo._id, event.currentTarget.checked);
      }}
    />
    <label for={todo._id} class={todoClasses}>
      <TodoIcon classes="me-2" completed={todo.completed} size="36px" />
      {todo.title}
    </label>
  </div>

  <div class="dropdown text-end d-flex align-items-center" aria-expanded="false">
    <button
      class="cstm_dropdown-actions btn h-auto"
      data-bs-toggle="dropdown"
      id={`todo_action_${todo._id}`}
    >
      <ActionIcon />
    </button>
    <ul
      class={`dropdown-menu dropdown-menu-end shadow-sm ${$theme.dropdownClass}`}
      aria-labelledby={`todo_action_${todo._id}`}
    >
      <li>
        <button
          class="dropdown-item"
          on:click={() => setSelectedEditTodo(todo)}
          data-bs-toggle="modal"
          data-bs-target="#editModal"
        >
          Edit
        </button>
      </li>
      <li>
        <button
          class="dropdown-item"
          on:click={() => setSelectedDeleteTodo(todo)}
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</li>
