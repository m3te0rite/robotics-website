<script lang="ts">
	import { page } from '$app/stores';
	import { ArrowLeft } from 'lucide-svelte';
</script>

<div class="card">
	<div class="code">Error {$page.status}</div>
	<h1>{$page.status === 404 ? 'Page not found.' : 'Something went wrong.'}</h1>
	<p>
		{#if $page.status === 404}
			The page you're looking for doesn't exist or may have moved.
		{:else}
			{$page.error?.message ?? 'An unexpected error occurred.'}
		{/if}
	</p>
	<a href="/"><ArrowLeft size={14} />Back to home</a>
</div>

<style>
	:global(body) {
		display: grid;
		place-items: center;
		min-height: 100dvh;
		padding: 2rem;
	}

	.card {
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0;
		padding: 3rem 3.5rem;
		max-width: 480px;
		width: 100%;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.code {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.35);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin-bottom: 1rem;
	}

	h1 {
		font-family: var(--font-heading);
		font-style: italic;
		font-weight: 400;
		font-size: 2.75rem;
		color: #dcdfe4;
		line-height: 1.1;
		margin-bottom: 1.25rem;
	}

	p {
		font-size: 0.8rem;
		color: #9a9ea6;
		line-height: 1.7;
		margin-bottom: 2rem;
	}

	a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.75rem;
		color: #dcdfe4;
		text-decoration: none;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0;
		padding: 0.55rem 1rem;
		transition: border-color 0.15s, color 0.15s;
	}
	a:hover {
		border-color: rgba(255, 255, 255, 0.2);
		color: #ffffff;
	}
</style>
