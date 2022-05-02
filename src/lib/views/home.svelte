<script lang='ts'>
  import { isAuthenticated, theme, username } from '$lib/global-state';
  import VerifiedIcon from '$lib/components/icons/verified-icon.svelte';
</script>

<div class={`cstm_container container-fluid ${$theme.textClass}`}>
	{#if $isAuthenticated}
    <p class="alert alert-success d-flex align-items-center mt-5" role="alert">
      <VerifiedIcon classes="cstm_verified-alert-icon" size="36px" />
      <span class="ps-2">
        Welcome back, {$username}!{' '}
        <a class="cstm_verified-alert-link" href="/todos">
          Manage your todos here
        </a>
        .
      </span>
    </p>
  {/if}
	<h1 class={`cstm_head-text text-center ${$theme.textClass}`}>
		Protect with ForgeRock; Develop with SvelteKit
	</h1>

	<p
		class={`cstm_subhead-text fs-3 mb-4 fw-bold ${$theme.textMutedClass}`}
	>
		Learn how to develop ForgeRock protected, web apps with the{' '}
		<a
			class={`${$theme.textMutedClass}`}
			href="https://kit.svelte.dev/"
		>
			SvelteKit
		</a>{' '}
		library and our{' '}
		<a
			class={`${$theme.textMutedClass}`}
			href="https://github.com/ForgeRock/forgerock-javascript-sdk"
		>
			JavaScript SDK
		</a>
		.
	</p>
	<h2 class={`fs-4 fw-normal pt-3 pb-1 ${$theme.textClass}`}>
		About this project
	</h2>
	<p>
		The purpose of this sample web app is to demonstrate how the ForgeRock
		JavaScript SDK is implemented within a fully-functional application
		using a popular framework. The source code for{' '}
		<a href="https://github.com/cerebrl/forgerock-sample-web-react">
			this project can be found on Github
		</a>{' '}
		and run locally for experimentation. For more on our SDKs,{' '}
		<a href="https://sdks.forgerock.com/">
			you can find our official SDK documentation here.
		</a>
	</p>
	{#if !$isAuthenticated}
    <h2 class={`fs-4 fw-normal pt-3 pb-1 ${$theme.textClass}`}>Getting started</h2>
    <p>
      To use this app, <a href="/register">create an account now</a>! Already have an account?{' '}
      <a href="/login">Sign in</a> to get things done!
    </p>
  {/if}
</div>
