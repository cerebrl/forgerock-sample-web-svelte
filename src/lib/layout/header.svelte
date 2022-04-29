<script lang="ts">
  import ForgeRockIcon from '$lib/components/icons/forgerock-icon.svelte';
  import ReactIcon from '$lib/components/icons/react-icon.svelte';

  import { isAuthenticated, theme } from '../global-state';
  import AccountItemIn from './account-item-in.svelte';
  import AccountItemOut from './account-item-out.svelte';
  import TodosItemIn from './todos-item-in.svelte';
  import TodosItemOut from './todos-item-out.svelte';

  let LoginOrOutItem = AccountItemOut;
  let TodosItem = TodosItemOut;

  if ($isAuthenticated) {
    LoginOrOutItem = AccountItemIn;
    TodosItem = TodosItemIn;
  }
</script>

<nav
  class={`navbar navbar-expand ${$theme.navbarClass} ${$theme.borderHighContrastClass} py-0 border-bottom`}
>
  <div class="cstm_container container-fluid d-flex align-items-stretch">
    <a
      href="/"
      class={`cstm_navbar-brand ${$isAuthenticated ? 'cstm_navbar-brand_auth' : ''} navbar-brand ${
        $isAuthenticated ? 'd-none d-sm-none d-md-block' : ''
      } py-3 pe-4 me-4 ${$theme.borderHighContrastClass}`}
    >
      <ForgeRockIcon size="31px" /> + <ReactIcon size="38px" />
    </a>
    <div class="navbar-collapse d-flex align-items-stretch" id="navbarNav">
      <ul class="navbar-nav d-flex align-items-stretch me-auto">
        <svelte:component this={TodosItem}/>
      </ul>
      <svelte:component this={LoginOrOutItem}/>
    </div>
  </div>
</nav>
