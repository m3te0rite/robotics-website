<script lang="ts">
	import { onMount } from 'svelte';
	import GlassButton from './GlassButton.svelte';
	import { magnetic } from '$lib/actions';
	import { loadGsap } from '$lib/gsap';
	import { siteContent } from '$lib/site-content.svelte';
	import { Dot } from 'lucide-svelte';

	let section: HTMLElement;
	let line1: HTMLSpanElement;
	let line2: HTMLSpanElement;
	let subtitleRef: HTMLParagraphElement;

	onMount(async () => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const gsap = await loadGsap();

		[line1, line2, subtitleRef].forEach((el) => (el.style.willChange = 'transform'));
		const base = { trigger: section, start: 'top top', end: 'bottom top', scrub: true };
		gsap.to(line1, { yPercent: -35, ease: 'none', scrollTrigger: base });
		gsap.to(line2, { yPercent: -20, ease: 'none', scrollTrigger: base });
		gsap.to(subtitleRef, { yPercent: -8, ease: 'none', scrollTrigger: base });
	});
</script>

<section
	bind:this={section}
	id="hero"
	class="relative min-h-screen flex items-start overflow-hidden border-b"
	style="border-color: var(--color-rule); padding-left: max(4vw, 2rem); padding-top: clamp(6rem, 12vh, 9rem); z-index: var(--z-glass);"
>
	<!-- team logo -->
	<div
		class="absolute pointer-events-none select-none flex items-center justify-center"
		style="
			right: max(4vw, 2rem);
			top: 0;
			bottom: 0;
			width: min(38vw, 34rem);
			-webkit-mask-image: radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
			mask-image: radial-gradient(ellipse 75% 70% at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%);
		"
	>
		<img
			src={siteContent.heroBackgroundUrl}
			alt=""
			aria-hidden="true"
			width="1200"
			height="1600"
			fetchpriority="low"
			class="hero-mark"
			style="max-width: 100%; max-height: 62vh; width: auto; height: auto; display: block; opacity: 0.3; mix-blend-mode: multiply; filter: saturate(0) brightness(0.95) contrast(0.9);"
		/>
	</div>

	<div class="relative flex flex-col gap-10 pb-24" style="z-index: var(--z-glass);">
		<h1 style="font-family: var(--font-heading);">
			<span
				bind:this={line1}
				class="block text-white"
				style="font-size: var(--text-hero); line-height: 0.95; letter-spacing: -0.04em;"
			>{siteContent.heroTitle}</span>
			<span
				bind:this={line2}
				class="block text-white"
				style="font-size: var(--text-hero-sub); line-height: 1.1; letter-spacing: -0.04em;"
			>{siteContent.heroSecondLine}</span>
		</h1>

		<p
			bind:this={subtitleRef}
			class="text-base leading-relaxed"
			style="max-width: 46ch; color: color-mix(in srgb, var(--color-foreground) 68%, transparent);"
		>
			{siteContent.heroSubtitle} {siteContent.teamName} · FTC {siteContent.teamNumber} · {siteContent.location}.
		</p>
		<div class="flex gap-4 flex-wrap">
			<span use:magnetic>
				<GlassButton variant="primary" href="#robot">{siteContent.heroBuildLabel}</GlassButton>
			</span>
			<span use:magnetic>
				<GlassButton variant="default" href="#season">{siteContent.heroSeasonLabel}</GlassButton>
			</span>
		</div>
	</div>

	<div
		class="absolute mono-label flex gap-6 flex-wrap"
		style="bottom: 2rem; left: max(4vw, 2rem); color: rgba(229,229,229,0.4);"
	>
		<span>{siteContent.location}</span>
		<Dot size={14} />
		<span>{siteContent.league}</span>
		<Dot size={14} />
		<span style="color: var(--color-primary);">{siteContent.teamNumber}</span>
	</div>
</section>

<style>
	:global(:root[data-theme='dark']) .hero-mark { mix-blend-mode: screen !important; filter: saturate(0) brightness(1.25) contrast(.9) !important; }
</style>