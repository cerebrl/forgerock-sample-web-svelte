<script lang="ts">
  import type { PasswordCallback } from '@forgerock/javascript-sdk'
  import EyeIcon from '$lib/components/icons/eye-icon.svelte';
  import { theme } from '$lib/global-state';

  export let callback: PasswordCallback;
  export let inputName = '';

  const failedPolicies = callback.getFailedPolicies && callback.getFailedPolicies();
  const policies = callback.getPolicies && callback.getPolicies();
  const passwordLabel = callback.getPrompt();

  let isRequired = false;
  let isVisible = false;
  let validationClass = '';

  function setValue(event: Event) {
    callback.setPassword((event.target as HTMLInputElement).value);
  }
  function toggleVisibility() {
    isVisible = !isVisible;
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
  <!-- <Validation /> -->
</div>
