<script lang="ts">
	import { onMount } from 'svelte';
	import { Moon, Sun } from 'lucide-svelte';
	import { currentTheme, initializeTheme, toggleTheme } from '$lib/theme.svelte';

	onMount(initializeTheme);
</script>

<button
	type="button"
	class="theme-toggle"
	aria-label={currentTheme.value === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
	title={currentTheme.value === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
	onclick={toggleTheme}
>
	{#if currentTheme.value === 'light'}
		<Moon size={16} />
	{:else}
		<Sun size={16} />
	{/if}
</button>