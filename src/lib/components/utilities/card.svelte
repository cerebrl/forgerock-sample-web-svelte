<script lang="ts">
  import { theme } from '../../global-state';
</script>

<div class={`card shadow-sm p-5 mb-2 w-100 ${$theme.cardBgClass} ${$theme.textClass}`}>
  <slot />
</div>
