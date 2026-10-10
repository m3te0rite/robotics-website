<script lang="ts">
	import { onMount } from 'svelte';
	import { loadGsap } from '$lib/gsap';

	let container: HTMLDivElement;

	onMount(async () => {
		const gsap = await loadGsap();
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');

		const lines = Array.from(container.querySelectorAll<SVGGeometryElement>('[data-draw]'));
		const lengths = lines.map((l) => l.getTotalLength?.() ?? 1000);
		lines.forEach((line, i) => {
			gsap.set(line, { strokeDasharray: lengths[i], strokeDashoffset: lengths[i] });
			gsap.to(line, {
				strokeDashoffset: 0,
				ease: 'none',
				scrollTrigger: {
					trigger: document.body,
					start: `${i * 15}% top`,
					end: `${i * 15 + 25}% top`,
					scrub: 1
				}
			});
		});
	});
</script>

<div
	bind:this={container}
	class="fixed inset-0 pointer-events-none"
	style="z-index: var(--z-grid);"
	aria-hidden="true"
>
	<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
		<!-- horiz -->
		<line data-draw x1="0" y1="25%" x2="100%" y2="25%" stroke="var(--color-rule)" stroke-width="1" />
		<line data-draw x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--color-rule)" stroke-width="1" />
		<line data-draw x1="0" y1="75%" x2="100%" y2="75%" stroke="var(--color-rule)" stroke-width="1" />
		<!-- vert -->
		<line data-draw x1="20%" y1="0" x2="20%" y2="100%" stroke="var(--color-rule)" stroke-width="1" />
		<line data-draw x1="80%" y1="0" x2="80%" y2="100%" stroke="var(--color-rule)" stroke-width="1" />
	</svg>
</div>