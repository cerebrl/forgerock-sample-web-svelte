<script lang="ts">
  import { TokenManager } from '@forgerock/javascript-sdk';
  import { browser } from '$app/env';

  import Footer from '$lib/layout/footer.svelte';
  import Header from '$lib/layout/header.svelte';

  import '$lib/config';
  import '../app.scss';

  if (browser) {
    document.body.classList.add('cstm_bg-dark', 'bg-dark');


  }
</script>

<Header />
<slot />
<Footer />
