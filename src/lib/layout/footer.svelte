<script lang="ts">
  import { theme } from '../global-state';
</script>

<div class="cstm_container container-fluid">
  <small
    class={`border-top d-block mt-5 py-5 ${$theme.textClass} ${$theme.borderHighContrastClass}`}
  >
    The Svelte name and logomark are properties of{' '}
    <a href="https://svelte.dev">Svelte</a>, and their use herein is for
    learning and illustrative purposes only.
  </small>
</div>
