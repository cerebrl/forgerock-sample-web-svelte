<script lang="ts">
  export let buttonText = '';
  export let submittingForm = false;
</script>

<button
  type="submit"
  class="btn btn-primary w-100"
  disabled={submittingForm}
>
{#if submittingForm}
    <!-- Render a small spinner during form submission -->
    <span
      class="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
{/if}
<span> {buttonText}</span>
</button>
