<script lang="ts">
  import Footer from '$lib/layout/footer.svelte';
  import Header from '$lib/layout/header.svelte';

  import '$lib/config';
  import '$lib/global-state';
  import '../app.scss';
</script>

<Header />
<slot />
<Footer />
