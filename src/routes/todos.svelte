<script lang="ts">
  import { UserManager } from '@forgerock/javascript-sdk';
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';

  import { isAuthenticated } from '$lib/global-state';
	import Todos from '$lib/views/todos.svelte';

  if (browser) {
    (async function validateAccessToken() {
      if ($isAuthenticated) {
        /**
         * If we they have been authenticated, validate that assumption
         */
        try {
          /** *****************************************************************
           * SDK INTEGRATION POINT
           * Summary: Optional client-side route access validation
           * ------------------------------------------------------------------
           * Details: Here, you could just make sure tokens exist –
           * TokenStorage.get() – or, validate tokens, renew expiry timers,
           * session checks ... Below, we are calling the userinfo endpoint to
           * ensure valid tokens before continuing, but it's optional.
           ***************************************************************** */
          await UserManager.getCurrentUser();
        } catch (err) {
          console.info(`Info: route validation; ${err}`);

          isAuthenticated.set(false);
          goto('/');
        }
      } else {
        /**
         * If we have no record of their authenticated, no need to call the server
         */
        isAuthenticated.set(false);
        goto('/');
      }
    })();
  }
</script>

<svelte:head>
	<title>Todos | ForgeRock: A Sample React (Web) Todo App</title>
	<meta name="description" content="Svelte todo sample app" />
</svelte:head>

<Todos />
