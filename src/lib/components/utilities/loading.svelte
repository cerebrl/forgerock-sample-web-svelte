<script lang="ts">
  import { theme } from '$lib/global-state';

  export let classes = '';
  export let message = '';
</script>

<div class="container">
  <p class={classes}>
    <span class="d-flex justify-content-center my-2">
      <span class="cstm_loading-spinner spinner-border text-primary" role="status"></span>
    </span>
    <span class={`d-flex justify-content-center p-3 fs-5 ${$theme.textClass}`}>
      {message}
    </span>
  </p>
</div>
