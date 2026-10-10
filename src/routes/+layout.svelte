<script lang="ts">
	import '../app.css';

	import Grid from '$lib/components/Grid.svelte';
	import { onMount } from 'svelte';
	import { initLenis } from '$lib/scroll';
	import { loadGsap } from '$lib/gsap';

	let { children } = $props();

	onMount(() => {
		let cleanup: (() => void) | undefined;
		(async () => {
			const gsap = await loadGsap();
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');

			const lenis = await initLenis();
			if (lenis) {
				gsap.ticker.add((t) => lenis.raf(t * 1000));
				gsap.ticker.lagSmoothing(0);
				lenis.on('scroll', ScrollTrigger.update);
				cleanup = () => lenis.destroy();
			}
		})();
		return () => cleanup?.();
	});
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
</svelte:head>
<a class="skip-link" href="#main-content">Skip to content</a>
<Grid />
{@render children()}