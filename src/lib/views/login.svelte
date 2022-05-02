<script lang='ts'>
  import BackHome from '$lib/components/utilities/back-home.svelte';
  import Card from '$lib/components/utilities/card.svelte';
  import Form from '$lib/components/journey/form.svelte';
  import { theme } from '$lib/global-state';
  import KeyIcon from '$lib/components/icons/key-icon.svelte';
</script>

<div class="cstm_container_v-centered container-fluid d-flex align-items-center">
  <div class="w-100">
    <BackHome />
    <Card>
      <div class="cstm_form-icon  align-self-center mb-3">
        <KeyIcon size="72px" />
      </div>
      <Form action={{ type: 'login' }}>
        <p slot='bottomMessage' class={`text-center text-secondary p-3 ${$theme.textClass}`}>
          Don’t have an account? <a href="/register">Sign up here!</a>
        </p>
      </Form>
    </Card>
  </div>
</div>
