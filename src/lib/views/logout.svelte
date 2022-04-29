<script lang="ts">
  import { FRUser } from '@forgerock/javascript-sdk';
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';

  import { email, isAuthenticated, username } from '$lib/global-state';
  import Loading from '$lib/components/utilities/loading.svelte';

  (async () => {
    if (browser) {
      await FRUser.logout();

      email.set('');
      isAuthenticated.set(false);
      username.set('');

      goto('/');
    }
  })();
</script>

<Loading classes="pt-5" message="You're being logged out ..." />
