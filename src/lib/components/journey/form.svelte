<script lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import type { Writable } from 'svelte/store';

  import Alert from '$lib/components/journey/alert.svelte';
  import Boolean from './boolean.svelte';
  import Button from '$lib/components/journey/button.svelte';
  import Choice from './choice.svelte';
  import CreatePassword from '$lib/components/journey/create-password.svelte';
  import CreateTextAttribute from '$lib/components/journey/create-text-attribute.svelte';
  import CreateUsername from '$lib/components/journey/create-username.svelte';
  import { isAuthenticated, theme } from '$lib/global-state';
  import { initTree, type StepTypes } from '$lib/components/journey/journey-state';
  import Kba from './kba.svelte';
  import Loading from '$lib/components/utilities/loading.svelte';
  import Password from '$lib/components/journey/password.svelte';
  import TermsConditions from './terms-conditions.svelte';
  import Text from '$lib/components/journey/text.svelte';
  import treeReducer from '$lib/components/journey/tree-reducer';
  import Unknown from '$lib/components/journey/unknown.svelte';

  export let action = { type: '' };
  let submittingForm = false;

  const form = treeReducer(action);

  let failureMessage: Writable<string | null>;
  let getStep: (prevStep: StepTypes) => StepTypes;
  let step: Writable<StepTypes>;

  if (browser) {
    (async function callToInitializeTree() {
      let initObj = await initTree(form.tree);
      failureMessage = initObj.failureMessage;
      getStep = initObj.getStep;
      step = initObj.step;
    })();
  }

  $: {
    if ($isAuthenticated) {
      console.log('Form component recognises the user as authenticated');
      step.set(null);

      goto('/');
    }
  }
</script>

{#if !$step}
  <Loading message="Checking your session ..." />
{:else if $step.type === 'LoginSuccess'}
  <Loading message="Success! Redirecting ..." />
{:else if $step.type === 'Step'}
  <h1 class={`text-center fs-2 mb-3 ${$theme.textClass}`}>
    {form.titleText}
  </h1>
  <slot name="topMessage" />
  <form class="cstm_form" on:submit|preventDefault={() => getStep($step)}>
    {#if $failureMessage}
      <Alert message={$failureMessage} type="error" />
    {/if}
    {#each $step.callbacks as callback}
      {#if callback.getType() === 'BooleanAttributeInputCallback'}
        <Boolean {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'ChoiceCallback'}
        <Choice {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'KbaCreateCallback'}
        <Kba  {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'NameCallback'}
        <Text {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'PasswordCallback'}
        <Password {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'StringAttributeInputCallback'}
        <CreateTextAttribute {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'ValidatedCreatePasswordCallback'}
        <CreatePassword {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'ValidatedCreateUsernameCallback'}
        <CreateUsername {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'TermsAndConditionsCallback'}
        <TermsConditions  {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else}
        <Unknown {callback} />
      {/if}
    {/each}
    <Button buttonText={form.buttonText} {submittingForm} />
  </form>
  <slot name="bottomMessage" />
{:else}
  <Alert message={$step.payload?.message} type="error" />
{/if}
