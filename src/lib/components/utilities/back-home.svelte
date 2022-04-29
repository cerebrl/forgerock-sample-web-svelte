<script lang="ts">
  import { theme } from '../../global-state';
  import LeftArrowIcon from "$lib/components/icons/left-arrow-icon.svelte";

  const bootstrapClasses =
    'btn btn-sm text-bold text-decoration-none d-inline-block fs-6 my-2';
</script>

<a
  class={`cstm_back-home ${bootstrapClasses} ${
    $theme.mode === 'dark' ? 'cstm_back-home_dark' : ''
  }`}
  href="/"
>
  <LeftArrowIcon />
  Home
</a>
