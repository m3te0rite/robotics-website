<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowLeft, LogIn, LogOut } from 'lucide-svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import ContentEditor from '$lib/components/admin/ContentEditor.svelte';
	import { loadSiteContent } from '$lib/site-content.svelte';
	import { resolve } from '$app/paths';

	let authenticated = $state(false);
	let checkingSession = $state(true);
	let password = $state('');
	let busy = $state(false);
	let errorMessage = $state('');

	onMount(async () => {
		try {
			const response = await fetch('/api/admin/session', { cache: 'no-store' });
			authenticated = (await response.json()).authenticated === true;
			if (authenticated) await loadSiteContent();
		} catch {
			errorMessage = 'Unable to connect to the site server.';
		} finally {
			checkingSession = false;
		}
	});

	async function login(event: SubmitEvent) {
		event.preventDefault();
		busy = true;
		errorMessage = '';
		try {
			const response = await fetch('/api/admin/login', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ password })
			});
			if (!response.ok) throw new Error((await response.json()).error ?? 'Unable to sign in.');
			authenticated = true;
			password = '';
			await loadSiteContent();
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Unable to sign in.';
		} finally {
			busy = false;
		}
	}

	async function logout() {
		await fetch('/api/admin/session', { method: 'DELETE' });
		authenticated = false;
	}
</script>

<svelte:head>
	<title>Site Editor</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main id="main-content" class="admin-page">
	<header class="admin-topbar">
		<a class="admin-back" href={resolve('/')}><ArrowLeft size={15} /> View site</a>
		<div class="admin-actions">
			{#if authenticated}<button class="admin-button" type="button" onclick={logout}><LogOut size={15} /> Sign out</button>{/if}
			<ThemeToggle />
		</div>
	</header>
	<section class="admin-content">
		<p class="mono-label">Site settings / FTC</p>
		{#if checkingSession}
			<h1>Checking access</h1>
		{:else if !authenticated}
			<h1>Admin sign in</h1>
			<p class="admin-note">Enter the site admin password to edit published content.</p>
			<form class="admin-login" onsubmit={login}>
				<label>Password<input type="password" bind:value={password} autocomplete="current-password" required /></label>
				<button class="admin-button admin-primary" type="submit" disabled={busy}><LogIn size={15} /> {busy ? 'Signing in...' : 'Sign in'}</button>
			</form>
		{:else}
			<h1>Team profile</h1>
			<p class="admin-note">Changes publish for every visitor.</p>
			<ContentEditor />
		{/if}
		{#if errorMessage}<p class="admin-error" role="alert">{errorMessage}</p>{/if}
	</section>
</main>

<style>
	.admin-login { max-width: 28rem; display: flex; flex-direction: column; align-items: flex-start; gap: 1rem; }
	.admin-login label { width: 100%; display: flex; flex-direction: column; gap: .5rem; color: var(--color-primary); font: 500 .7rem var(--font-mono); text-transform: uppercase; }
	.admin-login input { width: 100%; border: 1px solid var(--color-border); padding: .8rem .9rem; background: var(--color-card); color: var(--color-foreground); font: 400 .95rem var(--font-sans); text-transform: none; }
</style>