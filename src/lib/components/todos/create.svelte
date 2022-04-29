<script lang='ts'>
  import { theme } from '$lib/global-state';
  import type { Todo } from './interface';

  export let addTodo: (todo: Todo) => void;
  let creatingTodo = false;

  async function createTodo(event: any) {
    creatingTodo = true;

    const title = event.target.elements[0].value;
    const newTodo = await apiRequest('todos', 'POST', { title });

    addTodo(newTodo);
    creatingTodo = false;
  }
</script>

<form
  class={`p-3 d-flex ${$theme.textClass}`}
  action="https://api.example.com:8443/todos"
  method="POST"
  on:submit={createTodo}
  >
  <div class="cstm_todos-input cstm_form-floating form-floating flex-grow-1">
    <input
      id="newTodo"
      type="text"
      class={`cstm_form-control form-control bg-transparent ${$theme.textClass} ${$theme.borderClass}`}
      placeholder="What needs doing?"
      required={true}
    />
    <label for="newTodo">What needs doing?</label>
  </div>
  <button class="btn btn-primary ms-2" type="submit">
    {#if creatingTodo}
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
    {:else}
      Create
    {/if}
  </button>
</form>
