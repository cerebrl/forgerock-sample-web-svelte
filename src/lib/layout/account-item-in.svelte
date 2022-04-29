<script lang="ts">
  import { email, theme, username } from '../global-state';
  import AccountIcon from '../components/icons/account-icon.svelte';
</script>

<div class="d-flex align-items-center">
  <div class="dropdown text-end">
    <button
      aria-expanded="false"
      class="btn h-auto p-0"
      data-bs-toggle="dropdown"
      id="account_dropdown"
    >
      <AccountIcon classes="cstm_profile-icon" size="48px" />
    </button>
    <ul
      class={`dropdown-menu dropdown-menu-end shadow-sm pb-0 ${$theme.dropdownClass}`}
      aria-labelledby="account_dropdown"
    >
      <li>
        <div
          class={`dropdown-header border-bottom ${$theme.borderClass}`}
        >
          <p
            class={`fw-bold fs-6 mb-0 ${
              $theme.textClass ? $theme.textClass : 'text-dark'
            }`}
          >
            {$username}
          </p>
          <p class="mb-2">{$email}</p>
        </div>
      </li>
      <li>
        <a class="dropdown-item py-2" href="/logout">
          Sign Out
        </a>
      </li>
    </ul>
  </div>
</div>
