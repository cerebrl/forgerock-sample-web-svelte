<script lang="ts">
  import { theme } from '$lib/global-state';

  export let deleteTodo: () => Promise<void>;
</script>

<div
  class={`modal fade`}
  data-bs-backdrop="static"
  id="deleteModal"
  tabIndex="-1"
  aria-modal="true"
  role="dialog"
>
  <div class={`modal-dialog`}>
    <div class={`modal-content  ${$theme.cardBgClass} ${$theme.textClass} ${$theme.borderClass}`}>
      <div class="modal-body pt-4 px-4">
        <p>Are you sure you want to delete this todo?</p>
      </div>
      <div class={`modal-footer p-3 ${$theme.borderClass}`}>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          class="btn btn-secondary"
        >
          Close
        </button>
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          class="btn btn-danger"
          on:click={deleteTodo}
        >
          Delete Todo
        </button>
      </div>
    </div>
  </div>
</div>
