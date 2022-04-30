<script lang="ts">
  import type { FRCallback } from '@forgerock/javascript-sdk';

  export let callback: FRCallback;

  let callbackType = callback.getType();
</script>

<div class="form-group">
  <p>{`Warning: unknown callback type, ${callbackType}, isn't handled`}</p>
</div>
