<script lang="ts">
  import { page } from '$app/stores';

  import HomeIcon from '$icons/home-icon.svelte';
  import TodosIcon from '$icons/todos-icon.svelte';
</script>

<li
	class={`cstm_nav-item ${$page.url.pathname === '/' ? 'cstm_nav-item_active' : ''} nav-item mx-1`}
>
	<a class="cstm_nav-link nav-link d-flex align-items-center h-100 p-0 ps-1" href="/">
		<HomeIcon />
		<span class="px-2 fs-6">Home</span>
	</a>
</li>
<li
	class={`cstm_nav-item ${$page.url.pathname === '/todos' ? 'cstm_nav-item_active' : ''} nav-item`}
>
	<a class="cstm_nav-link nav-link d-flex align-items-center h-100 p-0 ps-2" href="/todos">
		<TodosIcon />
		<span class="px-2 fs-6">Todos</span>
	</a>
</li>
