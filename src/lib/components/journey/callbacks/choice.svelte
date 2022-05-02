<script lang='ts'>
  import { theme } from '$lib/global-state';
  import type { ChoiceCallback } from '@forgerock/javascript-sdk';

  export let callback: ChoiceCallback;
  export let inputName = '';

  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  const prompt = callback.getPrompt();
  const choiceOptions = callback.getChoices();
  const defaultChoice = callback.getDefaultChoice();

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
    callback.setChoiceIndex(Number((event.target as HTMLSelectElement).value));
  }
</script>

<div class="cstm_form-floating form-floating mb-3">
  <select
    on:change={setValue}
    id={inputName}
    name="selected"
    class={`cstm_form-select form-select bg-transparent ${$theme.textClass} ${$theme.borderClass}`}
  >
    {#each choiceOptions as option, idx}
      <option value={idx} selected={idx === defaultChoice}>
        {option}
      </option>
    {/each}
  </select>
  <label for={inputName}>{prompt}</label>
</div>
