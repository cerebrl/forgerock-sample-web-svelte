<script lang="ts">
  import { theme } from '$lib/global-state';
  import type { Todo } from '$todos/interface';

  export let editTodo: (obj: { _id: string; title: string }) => Promise<void>;
  export let setSelectedEditTodo: (todo: Todo) => void;
  export let selectedEditTodo: Todo | null;

  function updateTitle(event: Event) {
    setSelectedEditTodo({ ...selectedEditTodo as Todo, title: (event.target as HTMLInputElement).value });
  }

  function submit(event: Event, type: string) {
    event.preventDefault();

    editTodo(selectedEditTodo as Todo);

    // TODO: Improve modal handling
    if (type === 'form') {
      document.getElementById('closeEditModalBtn')?.click();
    }
  }
</script>

<div
  class={`modal fade`}
  data-bs-backdrop="static"
  id="editModal"
  tabIndex="-1"
  aria-modal="true"
  role="dialog"
>
  <div class={`modal-dialog`}>
    <div class={`modal-content  ${$theme.cardBgClass} ${$theme.textClass} ${$theme.borderClass}`}>
      <div class={`modal-header ${$theme.borderClass}`}>
        <h4 class={`modal-title ${$theme.textClass}`}>Edit Todo</h4>
      </div>
      <form on:submit|preventDefault={(e) => submit(e, 'form')} class="modal-body">
        <div class="cstm_todos-input cstm_form-floating form-floating flex-grow-1">
          <input
            id="editTodo"
            type="text"
            class={`cstm_form-control form-control bg-transparent ${$theme.textClass} ${$theme.borderClass}`}
            value={selectedEditTodo ? selectedEditTodo.title : ''}
            on:change={updateTitle}
            required={true}
          />
          <label for="newTodo">Update todo text</label>
        </div>
      </form>
      <div class={`modal-footer ${$theme.borderClass}`}>
        <button
          id="closeEditModalBtn"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          class="btn btn-secondary"
        >
          Close
        </button>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          class="btn btn-primary"
          on:click={(e) => submit(e, 'update-button')}
        >
          Update Todo
        </button>
      </div>
    </div>
  </div>
</div>
