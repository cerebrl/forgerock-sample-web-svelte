<script lang="ts">
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import type { Writable } from 'svelte/store';

  import Alert from '$lib/components/journey/alert.svelte';
  import Boolean from './callbacks/boolean.svelte';
  import Button from '$lib/components/journey/button.svelte';
  import Choice from './callbacks/choice.svelte';
  import CreatePassword from '$lib/components/journey/callbacks/create-password.svelte';
  import CreateTextAttribute from '$lib/components/journey/callbacks/create-text-attribute.svelte';
  import CreateUsername from '$lib/components/journey/callbacks/create-username.svelte';
  import { isAuthenticated, theme } from '$lib/global-state';
  import { initTree, type StepTypes } from '$lib/components/journey/journey-state';
  import Kba from './callbacks/kba.svelte';
  import Loading from '$lib/components/utilities/loading.svelte';
  import Password from '$lib/components/journey/callbacks/password.svelte';
  import TermsConditions from './callbacks/terms-conditions.svelte';
  import Name from '$lib/components/journey/callbacks/name.svelte';
  import treeReducer from '$lib/components/journey/tree-reducer';
  import Unknown from '$lib/components/journey/callbacks/unknown.svelte';

  export let action = { type: '' };

  const form = treeReducer(action);

  let failureMessage: Writable<string | null>;
  let getStep: (prevStep: StepTypes) => StepTypes;
  let step: Writable<StepTypes>;
  let submittingForm: Writable<boolean>;

  if (browser) {
    /**
     * @function callToInitializeTree - Initializes tree and makes first request
     * @returns {Promise<Object>} - Object with Svelte stores and method for continuation
    */
    (async function callToInitializeTree() {
      let initObj = await initTree(form.tree);

      failureMessage = initObj.failureMessage;
      getStep = initObj.getStep;
      step = initObj.step;
      submittingForm = initObj.submittingForm;
    })();
  }

  $: {
    /**
     * Detect when user completes authentication and redirect to home
    */
    if ($isAuthenticated) {
      console.log('Form component recognises the user as authenticated');
      step.set(null);

      goto('/');
    }
  }
</script>


<!--
  /**
  * Render conditions for presenting appropriate views to user.
  * First, we need to handle no "step", which means we are waiting for
  * the initial response from AM for authentication.
  *
  * Once we have a step, we then need to ensure we don't already have a
  * success or failure. If we have a step but don't have a success or
  * failure, we will likely have callbacks that we will need to present'
  * to the user in their render component form.
  */
-->
{#if !$step}
  <!--
    /**
     * Since there is no step information we need to call AM to retrieve the
     * instructions for rendering the login form.
     */
  -->
  <Loading message="Checking your session ..." />
{:else if $step.type === 'LoginSuccess'}
  <!--
    /**
    * Since we have successfully authenticated, show a success message to
    * user while we complete the process and redirect to home page.
    */
  -->
  <Loading message="Login success! Requesting tokens ..." />
{:else if $step.type === 'Step'}
  <!--
    /**
     * The step to render has callbacks, so we need to collect additional
     * data from user. Map callbacks to form inputs.
     */
  -->
  <h1 class={`text-center fs-2 mb-3 ${$theme.textClass}`}>
    {form.titleText}
  </h1>
  <slot name="topMessage" />
  <form
    class="cstm_form"
    on:submit|preventDefault={() => {
      // Get next step, passing previous step with new data
      getStep($step);
      // Set to true to indicate form is processing
      submittingForm.set(true);
    }}
  >
    {#if $failureMessage}
      <Alert message={$failureMessage} type="error" />
    {/if}
    <!--
      /**
       * Map over the callbacks in renderStep and render the appropriate
       * component for each one.
       */
    -->
    {#each $step.callbacks as callback}
      {#if callback.getType() === 'BooleanAttributeInputCallback'}
        <Boolean {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'ChoiceCallback'}
        <Choice {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'KbaCreateCallback'}
        <Kba {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'NameCallback'}
        <Name {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'PasswordCallback'}
        <Password {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'StringAttributeInputCallback'}
        <CreateTextAttribute {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'ValidatedCreatePasswordCallback'}
        <CreatePassword {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'ValidatedCreateUsernameCallback'}
        <CreateUsername {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else if callback.getType() === 'TermsAndConditionsCallback'}
        <TermsConditions {callback} inputName={callback?.payload?.input?.[0].name} />
      {:else}
        <Unknown {callback} />
      {/if}
    {/each}
    <Button buttonText={form.buttonText} submittingForm={$submittingForm} />
  </form>
  <slot name="bottomMessage" />
{:else}
  <!-- Just in case things blow up. -->
  <Alert message={$step.payload?.message} type="error" />
{/if}
