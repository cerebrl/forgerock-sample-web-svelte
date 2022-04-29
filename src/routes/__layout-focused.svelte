<script lang="ts">
  import { browser } from '$app/env';

  import '$lib/config';
  import '../app.scss';

  if (browser) {
    document.body.classList.add('cstm_bg-dark', 'bg-dark');
  }
</script>

<slot />
