<script lang="ts">
  import { CallbackType } from '@forgerock/javascript-sdk';
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import type { Writable } from 'svelte/store';

  import Alert from '$journey/alert.svelte';
  import Boolean from '$journey/callbacks/boolean.svelte';
  import Button from '$journey/button.svelte';
  import Choice from '$journey/callbacks/choice.svelte';
  import CreatePassword from '$journey/callbacks/create-password.svelte';
  import CreateTextAttribute from '$journey/callbacks/create-text-attribute.svelte';
  import CreateUsername from '$journey/callbacks/create-username.svelte';
  import { isAuthenticated, theme } from '$lib/global-state';
  import { initTree, type StepTypes } from '$journey/journey-state';
  import Kba from '$journey/callbacks/kba.svelte';
  import Loading from '$utilities/loading.svelte';
  import Password from '$journey/callbacks/password.svelte';
  import TermsConditions from './callbacks/terms-conditions.svelte';
  import Name from '$journey/callbacks/name.svelte';
  import treeReducer from '$journey/tree-reducer';
  import Unknown from '$journey/callbacks/unknown.svelte';

  export let action = { type: '' };

  const form = treeReducer(action);

  let failureMessage: Writable<string | null>;
  let getStep: (prevStep?: StepTypes) => Promise<void>;
  let step: Writable<StepTypes>;
  let submittingForm: Writable<boolean>;

  /**
   * Iterate through callbacks received from AM and map the callback to the
   * appropriate callback component, pushing that component
   * the StepComponent's array.
   */
  function mapCallbackToComponent(cb: any) {
    /** *********************************************************************
     * SDK INTEGRATION POINT
     * Summary:SDK callback method for getting the callback type
     * ----------------------------------------------------------------------
     * Details: This method is helpful in quickly identifying the callback
     * when iterating through an unknown list of AM callbacks
     ********************************************************************* */
    switch (cb.getType()) {
      case CallbackType.BooleanAttributeInputCallback:
        return Boolean;
      case CallbackType.ChoiceCallback:
        return Choice;
      case CallbackType.KbaCreateCallback:
        return Kba;
      case CallbackType.NameCallback:
        return Name;
      case CallbackType.PasswordCallback:
        return Password;
      case CallbackType.StringAttributeInputCallback:
        return CreateTextAttribute;
      case CallbackType.ValidatedCreatePasswordCallback:
        return CreatePassword;
      case CallbackType.ValidatedCreateUsernameCallback:
        return CreateUsername;
      case CallbackType.TermsAndConditionsCallback:
        return TermsConditions;
      default:
        return Unknown;
    }
  }

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
      <!--
        /**
         * Using @const to save off the inputName for easier readability.
         * Then, using the dynamic svelte component syntax to pull logic out of the
         * template and into the JS above for assigning the right component to the
         * callback.
         */
       -->
      {@const inputName = callback?.payload?.input?.[0].name}
      <svelte:component this={mapCallbackToComponent(callback)} {callback} {inputName} />
    {/each}
    <Button buttonText={form.buttonText} submittingForm={$submittingForm} />
  </form>
  <slot name="bottomMessage" />
{:else}
  <!-- Just in case things blow up. -->
  <Alert message={$step.payload?.message || ''} type="error" />
{/if}
