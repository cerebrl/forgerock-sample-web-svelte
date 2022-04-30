<script lang="ts">
  import { isAuthenticated } from '$lib/global-state';

	import Home from '$lib/views/home.svelte';

  console.log($isAuthenticated);
</script>

<svelte:head>
	<title>Home | ForgeRock: A Sample React (Web) Todo App</title>
	<meta name="description" content="Svelte todo sample app" />
</svelte:head>

<Home />
