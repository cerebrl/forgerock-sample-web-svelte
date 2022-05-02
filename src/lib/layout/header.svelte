<script lang="ts">
  import ForgeRockIcon from '$icons/forgerock-icon.svelte';
  import SvelteIcon from '$icons/svelte-icon.svelte';

  import { isAuthenticated, theme } from '$lib/global-state';
  import AccountItemIn from '$lib/layout/account-item-in.svelte';
  import AccountItemOut from '$lib/layout/account-item-out.svelte';
  import TodosItemIn from '$lib/layout/todos-item-in.svelte';
</script>

<nav
  class={`navbar navbar-expand ${$theme.navbarClass} ${$theme.borderHighContrastClass} py-0 border-bottom`}
>
  <div class="cstm_container container-fluid d-flex align-items-stretch ">
    <a
      href="/"
      class={`cstm_navbar-brand ${$isAuthenticated ? 'cstm_navbar-brand_auth' : ''} navbar-brand ${
        $isAuthenticated ? 'd-none d-sm-none d-md-block' : ''
      } py-3 pe-4 me-4 mt-1 ${$theme.borderHighContrastClass}`}
    >
      <ForgeRockIcon size="32px" /> + <SvelteIcon size="36px" />
    </a>
    <div class="navbar-collapse d-flex align-items-stretch" id="navbarNav">
      <ul class="navbar-nav d-flex align-items-stretch me-auto">
        <svelte:component this={$isAuthenticated ? TodosItemIn : null}/>
      </ul>
      <svelte:component this={$isAuthenticated ? AccountItemIn : AccountItemOut}/>
    </div>
  </div>
</nav>
