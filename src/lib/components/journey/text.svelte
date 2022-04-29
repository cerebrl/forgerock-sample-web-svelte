<script lang="ts">
  import {
    AttributeInputCallback,
    type NameCallback,
    type PolicyRequirement
  } from '@forgerock/javascript-sdk';

  import { theme } from '$lib/global-state';

  interface StringDictionary<T> {
    [name: string]: T;
  }

  export let callback: AttributeInputCallback<string> | NameCallback;
  export let inputName = '';

  const existingValue = callback.getInputValue();
  const textInputLabel = callback.getPrompt();

  let failedPolicies: PolicyRequirement[];
  let policies: StringDictionary<any>;
  let stringAttributeName: string;

  if (callback instanceof AttributeInputCallback) {
    failedPolicies = callback.getFailedPolicies && callback.getFailedPolicies();
    policies = callback.getPolicies && callback.getPolicies();
    stringAttributeName = callback.getName && callback.getName();
  }

  let isRequired = false;
  let validationClass = '';

  function setValue(event: any) {
    callback.setInputValue(event.target.value);
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
    type={stringAttributeName == 'mail' ? 'email' : 'text'}
  />
  <label for={inputName}>{textInputLabel}</label>
  <!-- <Validation /> -->
</div>
