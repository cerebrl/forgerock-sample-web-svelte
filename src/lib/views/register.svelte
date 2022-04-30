<script lang='ts'>
  import BackHome from '../components/utilities/back-home.svelte';
  import Card from '../components/utilities/card.svelte';
  import Form from '../components/journey/form.svelte';
  import { theme } from '../global-state';
  import NewUserIcon from '../components/icons/new-user-icon.svelte';
</script>

<div class="cstm_container_v-centered container-fluid d-flex align-items-center">
  <div class="w-100">
    <BackHome />
    <Card>
      <div class="cstm_form-icon  align-self-center mb-3">
        <NewUserIcon size="72px" />
      </div>
      <Form action={{ type: 'register' }}>
        <p slot='topMessage' class={`text-center text-secondary pb-2 ${$theme.textClass}`}>
          Already have an account? <a href="/login">Sign in here!</a>
        </p>
      </Form>
    </Card>
  </div>
</div>
