<script lang="ts">
  import type { NameCallback } from '@forgerock/javascript-sdk';

  import { theme } from '$lib/global-state';

  export let callback: NameCallback;
  export let inputName = '';

  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  const existingValue = callback.getInputValue();
  const textInputLabel = callback.getPrompt();

  let validationClass = '';

  /**
   * @function setValue - Sets the value on the callback on element blur (lose focus)
   * @param {Object} event
   */
  function setValue(event: any) {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: SDK callback methods for setting values
     * ------------------------------------------------------------------------
     * Details: Each callback is wrapped by the SDK to provide helper methods
     * for writing values to the callbacks received from AM
     *********************************************************************** */
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
