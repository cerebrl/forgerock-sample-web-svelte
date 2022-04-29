<script lang="ts">
  import { theme } from '../global-state';
</script>

<div class="d-flex py-3">
  <a
    href="/login"
    class={`btn btn-link cstm_login-link py-2 px-3 mx-1 ${
      $theme.mode === 'dark' ? 'cstm_login-link_dark' : ''
    }`}
  >
    Sign In
  </a>
  <a class="btn btn-primary" href="/register">
    Sign Up
  </a>
</div>
