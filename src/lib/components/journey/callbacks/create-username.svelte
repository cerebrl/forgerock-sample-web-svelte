<script lang="ts">
  import type { ValidatedCreateUsernameCallback } from '@forgerock/javascript-sdk';

  import { theme } from '$lib/global-state';

  export let callback: ValidatedCreateUsernameCallback;
  export let inputName = '';

  const existingValue = callback.getInputValue();
  const failedPolicies = callback.getFailedPolicies && callback.getFailedPolicies();
  const policies = callback.getPolicies && callback.getPolicies();
  const textInputLabel = callback.getPrompt();

  let isRequired = false;
  let validationClass = '';
  let validationFailure: string;

  /**
   * @function setValue - Sets the value on the callback on element blur (lose focus)
   * @param {Object} event
   */
  function setValue(event: any) {
    callback.setInputValue(event.target.value);
  }

  if (failedPolicies?.length) {
    /**
     * Iterate over the failed policies producing a single string to render
     */
    validationFailure = failedPolicies.reduce((prev, curr) => {
      let failureObj;
      try {
        failureObj = JSON.parse(curr.policyRequirement);
      } catch (err) {
        console.log(`Parsing failure for ${textInputLabel}`);
      }
      switch (failureObj.policyRequirement) {
        case 'VALID_USERNAME':
          prev = `${prev}Please choose a different username. `;
          break;
        case 'VALID_EMAIL_ADDRESS_FORMAT':
          prev = `${prev}Please use a valid email address. `;
          break;
        default:
          prev = `${prev}Please check this value for correctness.`;
      }
      return prev;
    }, '');
    validationClass = 'is-invalid';

    if (policies?.policyRequirements) {
      isRequired = policies.policyRequirements.includes('REQUIRED');
    } else if (callback.isRequired) {
      isRequired = callback.isRequired();
    }
  }
</script>

<div class={`cstm_form-floating form-floating mb-3`}>
  <input
    class={`cstm_form-control form-control ${validationClass} bg-transparent ${$theme.textClass} ${$theme.borderClass}`}
    value={existingValue}
    id={inputName}
    name={inputName}
    on:change={setValue}
    placeholder={textInputLabel}
    required={isRequired}
    type="text"
  />
  <label for={inputName}>{textInputLabel}</label>
  {#if validationFailure}
    <div class="invalid-feedback">{validationFailure}</div>
  {/if}
</div>
