<script lang="ts">
  import type { PasswordCallback } from '@forgerock/javascript-sdk';

  import EyeIcon from '$icons/eye-icon.svelte';
  import { theme } from '$lib/global-state';

  export let callback: PasswordCallback;
  export let inputName = '';

  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  const failedPolicies = callback.getFailedPolicies && callback.getFailedPolicies();
  const policies = callback.getPolicies && callback.getPolicies();
  const passwordLabel = callback.getPrompt();

  let isRequired = false;
  let isVisible = false;
  let validationClass = '';
  let validationFailure: string;

  /**
   * @function setValue - Sets the value on the callback on element blur (lose focus)
   * @param {Object} event
   */
  function setValue(event: Event) {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: SDK callback methods for setting values
     * ------------------------------------------------------------------------
     * Details: Each callback is wrapped by the SDK to provide helper methods
     * for writing values to the callbacks received from AM
     *********************************************************************** */
    callback.setPassword((event.target as HTMLInputElement).value);
  }
  /**
   * @function toggleVisibility - toggles the password from masked to plaintext
   */
  function toggleVisibility() {
    isVisible = !isVisible;
  }
  if (failedPolicies && failedPolicies.length) {
    /**
     * Iterate over the failed policies producing a single string to render
     */
    validationFailure = failedPolicies.reduce((prev: string, curr): string => {
      console.log(curr);
      let failureObj;
      try {
        failureObj = JSON.parse(curr.policyRequirement);
      } catch (err) {
        console.log(`Parsing failure for ${passwordLabel}`);
      }

      switch (failureObj.policyRequirement) {
        case 'LENGTH_BASED':
          prev = `${prev}Ensure password contains more than ${failureObj.params['min-password-length']} characters. `;
          break;
        case 'CHARACTER_SET':
          prev = `${prev}Ensure password contains 1 of each: capital letter, number and special character. `;
          break;
        default:
          prev = `${prev}Please check this value for correctness.`;
      }
      return prev;
    }, '');
    validationClass = 'is-invalid';
  }

  if (policies) {
    isRequired = policies.includes('REQUIRED');
  }
</script>

<div class="cstm_form-floating input-group form-floating mb-3">
  <input
    class={`cstm_input-password form-control ${
      validationClass ? validationClass : ''
    } border-end-0 bg-transparent ${$theme.textClass} ${$theme.borderClass}`}
    id={inputName}
    name={inputName}
    on:change={setValue}
    placeholder={passwordLabel}
    type={isVisible ? 'text' : 'password'}
    required={isRequired}
  />
  <label for={inputName}>{passwordLabel}</label>
  <button
    class={`cstm_input-icon border-start-0 input-group-text bg-transparent ${$theme.textClass} ${$theme.borderClass}`}
    on:click={toggleVisibility}
    type="button"
  >
    <EyeIcon visible={isVisible} />
  </button>
  {#if validationFailure}
    <div class="invalid-feedback">{validationFailure}</div>
  {/if}
</div>
