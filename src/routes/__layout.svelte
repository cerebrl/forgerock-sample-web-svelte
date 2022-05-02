<script lang="ts">
  import { page } from '$app/stores';

  import Footer from '$lib/layout/footer.svelte';
  import Header from '$lib/layout/header.svelte';

  import initConfig from '$lib/config';
  import '$lib/global-state';
  import '../app.scss';

  initConfig($page.url);
</script>

<Header />
<slot />
<Footer />
