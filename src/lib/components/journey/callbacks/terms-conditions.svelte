<script lang="ts">
  import type { TermsAndConditionsCallback } from '@forgerock/javascript-sdk';

  export let callback: TermsAndConditionsCallback;
  export let inputName = '';

  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  const terms = callback.getTerms();
  const termsStart = terms.substring(0, 35) + ' ...';

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
    callback.setAccepted((event.target as HTMLInputElement).checked);
  }
</script>

<div class="form-check mb-4">
  <input
    class="form-check-input"
    checked={false}
    id={inputName}
    on:change={setValue}
    type="checkbox"
  />
  <label for={inputName} class="form-check-label">
    Please accept our below Terms and Conditions
    <details>
      <summary class="fw-bold ps-1">{termsStart}</summary>
      {terms}
    </details>
  </label>
</div>
