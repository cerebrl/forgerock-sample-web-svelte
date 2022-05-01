<script lang="ts">
  import type { NameCallback } from '@forgerock/javascript-sdk';

  import { theme } from '$lib/global-state';

  export let callback: NameCallback;
  export let inputName = '';

  const existingValue = callback.getInputValue();
  const textInputLabel = callback.getPrompt();

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
    required={true}
    type="text"
  />
  <label for={inputName}>{textInputLabel}</label>
</div>
