<script lang="ts">
  import AlertIcon from '$icons/alert-icon.svelte';
  import VerifiedIcon from '$icons/verified-icon.svelte';

  export let message: string;
  export let type: string;
</script>

{#if type === 'error'}
  <p class="alert alert-danger d-flex align-items-center mt-1" role="alert">
    <AlertIcon classes="cstm_alert-icon col-1" />
    <span class="ps-2">{message}</span>
  </p>
{:else if type === 'success'}
  <p class="alert alert-success d-flex align-items-center mt-5" role="alert">
    <VerifiedIcon classes="cstm_verified-alert-icon" size="36px" />
    <span class="ps-2">{message}</span>
  </p>
{:else}
  <p class="alert d-flex align-items-center mt-5" role="alert">
    <span class="ps-2">{message}</span>
  </p>
{/if}
