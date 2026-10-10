<script lang="ts">
	import { onMount } from 'svelte';
	import { siteContent } from '$lib/site-content.svelte';

	let { onComplete }: { onComplete?: () => void } = $props();

	let done = $state(false);
	let step = $state(0);
	let timers: ReturnType<typeof setTimeout>[] = [];

	function skip() {
		if (done) return;
		timers.forEach(clearTimeout);
		done = true;
		sessionStorage.setItem('introPlayed', 'true');
		onComplete?.();
	}

	onMount(() => {
		if (sessionStorage.getItem('introPlayed') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			done = true;
			onComplete?.();
			return;
		}

		timers = [
			setTimeout(() => { step = 1; }, 300),
			setTimeout(() => { step = 2; }, 1000),
			setTimeout(() => { step = 3; }, 1400),
			setTimeout(skip, 1800)
		];

		return () => timers.forEach(clearTimeout);
	});
</script>

{#if !done}
	<div
		class="fixed inset-0 flex items-center justify-center overflow-hidden transition-opacity duration-500 {step === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}"
		style="z-index: var(--z-intro); background: var(--color-background);"
		onclick={skip}
		role="presentation"
	>
		<div class="relative flex flex-col items-center" style="z-index: 10;">
			<div class="overflow-hidden">
				<span
					class="block mono-label mb-4 transition-all duration-1000 {step >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}"
				>
					Loading...
				</span>
			</div>

			<h1
				class="font-heading font-light tracking-tighter text-white/90 transition-all duration-1000 ease-out"
				style="font-family: var(--font-mono); font-size: clamp(4rem, 12vw, 9rem); letter-spacing: 0.05em; {step === 0 ? 'filter: blur(20px); opacity: 0; transform: scale(0.95)' : step === 1 ? 'filter: blur(0); opacity: 1; transform: scale(1)' : 'filter: blur(20px); opacity: 0; transform: scale(1.05)'}"
			>
				{siteContent.teamNumber}
			</h1>

			<div class="overflow-hidden mt-6 flex flex-col items-center gap-4">
				<div
					class="w-px h-16 bg-white/20 origin-top transition-transform duration-1000 delay-300 {step >= 1 ? 'scale-y-100' : 'scale-y-0'}"
				></div>
			</div>
		</div>

		<button
			class="absolute bottom-8 right-8 mono-label hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
			style="color: rgba(229,229,229,0.6);"
			onclick={(e) => { e.stopPropagation(); skip(); }}
		>
			click anywhere to skip
		</button>
	</div>
{/if}