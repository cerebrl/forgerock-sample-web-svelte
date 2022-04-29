<script lang="ts">
  import { browser } from '$app/env';
import { goto } from '$app/navigation';

  import Button from './button.svelte';
  import { email, isAuthenticated, theme, username } from '../../global-state';
  import { getStep, step, user } from './journey-state';
  import Password from './password.svelte';
  import Text from './text.svelte';
  import treeReducer from './tree-reducer';

  export let action = { type: '' };
  let submittingForm = false;

  const form = treeReducer(action);

  if (browser) {
    getStep();
  }

  $: {
    if ($user?.name) {
      email.set($user.email);
      isAuthenticated.set(true);
      step.set(null);
      username.set($user.name);

      goto('/');
    }
  }
</script>

<h1 class={`text-center fs-2 mb-3 ${$theme.textClass}`}>
  {form.titleText}
</h1>
<slot topMessage='topMessage' />
<form
  class="cstm_form"
  on:submit|preventDefault={getStep}
>
  {#if !$step}
    <p>Loading ...</p>
  {:else if $step.type === 'Step'}
    {#each $step.callbacks as callback}
      {#if callback.getType() === 'NameCallback'}
        <Text {callback} inputName={callback?.payload?.input?.[0].name} />
      {/if}
      {#if callback.getType() === 'PasswordCallback'}
        <Password {callback} inputName={callback?.payload?.input?.[0].name} />
      {/if}
    {/each}
  {:else if $step.type === 'LoginSuccess'}
    <p>Login Success!</p>
  {/if}

  <Button
    buttonText={form.buttonText}
    submittingForm={submittingForm}
  />
</form>
<slot name='bottomMessage' />
