<script lang="ts">
  import type { KbaCreateCallback } from '@forgerock/javascript-sdk';

  import { theme } from '$lib/global-state';
  import LockIcon from '$lib/components/icons/lock-icon.svelte';

  export let callback: KbaCreateCallback;
  export let inputName: string;

  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  const prompt = callback.getPrompt();
  const questions = callback.getPredefinedQuestions();
  const inputNameQuestion = inputName;
  const inputArr = callback?.payload?.input;
  const inputNameAnswer = Array.isArray(inputArr) && inputArr[1].name;

  function setAnswer(event: Event) {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: SDK callback methods for setting values
     * ------------------------------------------------------------------------
     * Details: Each callback is wrapped by the SDK to provide helper methods
     * for writing values to the callbacks received from AM
     *********************************************************************** */
    callback.setAnswer((event.target as HTMLSelectElement).value);
  }

  function setQuestion(event: Event) {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: SDK callback methods for setting values
     * ------------------------------------------------------------------------
     * Details: Each callback is wrapped by the SDK to provide helper methods
     * for writing values to the callbacks received from AM
     *********************************************************************** */
    callback.setQuestion((event.target as HTMLSelectElement).value);
  }
</script>

<hr class={`cstm_hr d-flex mt-5 ${$theme.textClass}`} />
<div class={`cstm_hr-lock_${$theme.mode} d-flex justify-content-center`}>
  <LockIcon />
</div>

<h2 class={`fs-6 mt-5 fw-normal ${$theme.textClass}`}>
  Provide security question(s) & answer(s) below
</h2>
<div class="cstm_form-floating form-floating mb-3">
  <select
    class={`cstm_form-select form-select bg-transparent ${$theme.textClass} ${$theme.borderClass}`}
    id={inputNameQuestion}
    name={inputNameQuestion}
    on:change={setQuestion}
    required={true}
  >
    <option value="">No selection</option>
    {#each questions as question, idx}
      <option value={idx}>
        {question}
      </option>
    {/each}
  </select>
  <label for={inputNameQuestion}>{prompt}</label>
</div>

<div
  class={`cstm_form-floating form-floating pb-5 mb-5 border-bottom pb-3 ${
    $theme.mode === 'dark' ? 'border-white' : 'border-secondary'
  }`}
>
  <input
    class={`cstm_form-control form-control bg-transparent ${$theme.textClass} ${$theme.borderClass}`}
    id={inputNameAnswer || 'kba-answer-id'}
    name={inputNameAnswer || 'kba-answer-name'}
    on:change={setAnswer}
    placeholder="Security Answer"
    required={true}
    type="text"
  />
  <label for={inputNameAnswer || 'ka-answer-label'}>Security Answer</label>
</div>
