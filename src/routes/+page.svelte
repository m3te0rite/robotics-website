<script lang="ts">
	import { onMount } from 'svelte';
	import IntroAnimation from '$lib/components/IntroAnimation.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Section from '$lib/components/Section.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import { loadSiteContent, siteContent } from '$lib/site-content.svelte';
	import { reveal } from '$lib/actions';
	import { ArrowRight } from 'lucide-svelte';

	let showContent = $state(false);
	onMount(() => {
		void loadSiteContent().catch(() => {});
	});

	let activeSub = $state(0);
	const activeIdx = $derived(Math.min(activeSub, Math.max(0, siteContent.robot.subsystems.length - 1)));
	const active = $derived(siteContent.robot.subsystems[activeIdx] ?? { label: '', description: '', x: 50, y: 50 });
	const activeIndex = $derived(String(activeIdx + 1).padStart(2, '0'));
</script>

<svelte:head>
	<title>FTC {siteContent.teamNumber} - {siteContent.teamName} Robotics</title>
	<meta name="description" content="{siteContent.teamName}, FTC team {siteContent.teamNumber}, based in {siteContent.location}." />
	<meta property="og:title" content="FTC {siteContent.teamNumber} - {siteContent.teamName} Robotics" />
	<meta property="og:description" content="{siteContent.teamName}, FTC team {siteContent.teamNumber}, based in {siteContent.location}." />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={siteContent.teamLogoUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="FTC {siteContent.teamNumber} - {siteContent.teamName} Robotics" />
	<meta name="twitter:description" content="{siteContent.teamName}, FTC team {siteContent.teamNumber}, based in {siteContent.location}." />
</svelte:head>

<noscript>
	<style>
		.js-hide { opacity: 1 !important; pointer-events: auto !important; height: auto !important; overflow: visible !important; }
	</style>
</noscript>

<div class="js-hide transition-opacity duration-500" style={!showContent ? 'opacity: 0; pointer-events: none; height: 100vh; overflow: hidden;' : 'opacity: 1;'}>
	<Nav />
	<main id="main-content">
		<Hero />

		<div use:reveal>
			<Section id="about" kicker="FTC {siteContent.teamNumber}">
				{#snippet title()}{siteContent.aboutTitle}{/snippet}
				<div class="flex flex-col gap-4 max-w-2xl">
					<p class="text-base leading-relaxed text-white/85">{siteContent.aboutDescription}</p>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-4 border-t mt-10" style="border-color: var(--color-rule);">
					{#each siteContent.stats as stat, i (i)}
						<div class="py-8 px-6 border-r last:border-r-0 flex flex-col gap-2" style="border-color: var(--color-rule);">
							<span class="font-heading font-light text-white" style="font-size: clamp(2rem, 4vw, 3rem); line-height: 1;">{stat.value}</span>
							<span class="mono-label">{stat.label}</span>
						</div>
					{/each}
				</div>
			</Section>
		</div>

		<div use:reveal>
			<Section id="robot" kicker={siteContent.robot.kicker}>
				{#snippet title()}{siteContent.robot.title}{/snippet}
				<div class="flex flex-col border-t" style="border-color: var(--color-rule);">
					<div class="grid grid-cols-1 lg:grid-cols-12 border-b" style="border-color: var(--color-rule);">
						<div
							class="lg:col-span-7 border-b lg:border-b-0 lg:border-r"
							style="border-color: var(--color-rule);"
						>
							<div class="relative w-full" style="aspect-ratio: 23 / 20;">
								<img
									src={siteContent.robot.imageUrl}
									alt={siteContent.robot.imageAlt}
									loading="lazy"
									class="absolute inset-0 w-full h-full object-contain p-8"
									style="filter: grayscale(1) brightness(1.3) contrast(1.15) drop-shadow(0 0 60px rgba(255, 255, 255, 0.07));"
								/>
								{#each siteContent.robot.subsystems as s, i (i)}
									{@const on = activeSub === i}
									<button
										type="button"
										class="marker absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
										class:is-active={on}
										style="left: {s.x}%; top: {s.y}%;"
										aria-label={s.label}
										aria-pressed={on}
										onmouseenter={() => (activeSub = i)}
										onfocus={() => (activeSub = i)}
										onclick={() => (activeSub = i)}
									>
										<span class="marker-ring"></span>
										<span class="mono-text" style="font-size: 10px;">{String(i + 1).padStart(2, '0')}</span>
									</button>
								{/each}
							</div>
						</div>
						<div class="lg:col-span-5 flex flex-col">
							<div class="px-8 py-10 border-b" style="border-color: var(--color-rule);">
								<span class="mono-label">{siteContent.robot.subsystemsLabel}</span>
								{#key activeSub}
									<div class="detail">
										<div class="flex items-baseline gap-4 mt-5">
											<span class="mono-text text-primary/60">{activeIndex}</span>
											<h3 class="font-heading font-light text-white" style="font-size: 1.6rem; line-height: 1.15;">{active.label}</h3>
										</div>
										<p class="text-base leading-relaxed text-white/75 mt-3" style="max-width: 42ch;">{active.description}</p>
									</div>
								{/key}
							</div>
							<div class="flex flex-col">
								{#each siteContent.robot.subsystems as s, i (i)}
									{@const on = activeSub === i}
									<button
										type="button"
										class="sub-row text-left px-8 py-3.5 border-b last:border-b-0 grid items-center gap-4"
										class:is-active={on}
										style="border-color: var(--color-rule); grid-template-columns: 1.75rem 1fr auto;"
										onmouseenter={() => (activeSub = i)}
										onfocus={() => (activeSub = i)}
										onclick={() => (activeSub = i)}
									>
										<span class="mono-text {on ? 'text-primary' : 'text-white/45'}">{String(i + 1).padStart(2, '0')}</span>
										<span class="mono-text {on ? 'text-white' : 'text-white/70'}">{s.label}</span>
										<ArrowRight size={13} class="sub-row-arrow" />
									</button>
								{/each}
							</div>
						</div>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 border-b" style="border-color: var(--color-rule);">
						<div class="px-8 py-12 flex flex-col gap-3 border-r" style="border-color: var(--color-rule);">
							<span class="mono-label">{siteContent.robot.specsTitle}</span>
							<div class="flex flex-col mt-3">
								{#each siteContent.robot.specs as row, i (i)}
									<div class="flex justify-between gap-4 border-b py-2.5" style="border-color: var(--color-rule);">
										<span class="mono-text text-white/55">{row.label}</span>
										<span class="mono-text text-white/90">{row.value}</span>
									</div>
								{/each}
							</div>
						</div>
						<div class="px-8 py-12 flex flex-col gap-3">
							<span class="mono-label">{siteContent.robot.softwareTitle}</span>
							<p class="text-base leading-relaxed text-white/75 mt-1" style="max-width: 40ch;">{siteContent.robot.softwareIntro}</p>
							<div class="flex flex-col mt-3">
								{#each siteContent.robot.software as row, i (i)}
									<div class="flex justify-between gap-4 border-b py-2.5" style="border-color: var(--color-rule);">
										<span class="mono-text text-white/55">{row.label}</span>
										<span class="mono-text text-primary/70">{row.value}</span>
									</div>
								{/each}
							</div>
						</div>
					</div>
					<div class="grid grid-cols-1 md:grid-cols-2 border-b" style="border-color: var(--color-rule);">
						<div class="px-8 py-10 flex flex-col gap-4 border-r" style="border-color: var(--color-rule);">
							<span class="mono-label">{siteContent.robot.hardwareTitle}</span>
							<p class="text-base leading-relaxed text-white/75" style="max-width: 44ch;">{siteContent.robot.hardwareDescription}</p>
							<span class="mono-text text-primary/55">{siteContent.robot.hardwareTag}</span>
						</div>
						<div class="px-8 py-10 flex flex-col gap-4">
							<span class="mono-label">{siteContent.robot.strategyTitle}</span>
							<p class="text-base leading-relaxed text-white/75" style="max-width: 44ch;">{siteContent.robot.strategyDescription}</p>
							<span class="mono-text text-primary/55">{siteContent.robot.strategyTag}</span>
						</div>
					</div>
				</div>
			</Section>
		</div>


		<div use:reveal>
				<Section id="season" kicker={siteContent.timeline.kicker}>
				{#snippet title()}{siteContent.timeline.title}{/snippet}
				<div class="w-full border-t-2 border-b-2" style="border-color: var(--color-rule);">
					<div class="grid border-b-2" style="grid-template-columns: 5rem 1fr 5rem; border-color: var(--color-rule);">
						<span class="mono-label px-6 py-3 border-r" style="border-color: var(--color-rule);">{siteContent.timeline.monthHeader}</span>
						<span class="mono-label px-6 py-3 border-r" style="border-color: var(--color-rule);">{siteContent.timeline.eventHeader}</span>
						<span class="mono-label px-6 py-3">{siteContent.timeline.statusHeader}</span>
					</div>
					{#each siteContent.timeline.rows as row, i (i)}
						<div
							class="grid border-b last:border-0 hover:bg-white/4 transition-none"
							style="grid-template-columns: 5rem 1fr 5rem; border-color: var(--color-rule);"
						>
							<span class="mono-text text-white/55 px-6 py-4 border-r" style="border-color: var(--color-rule);">{row.month}</span>
							<span class="px-6 py-4 text-sm border-r {row.status === 'active' ? 'text-white/95' : 'text-white/65'}" style="border-color: var(--color-rule);">{row.event}</span>
							<span class="px-6 py-4 flex items-center gap-1.5">
								{#if row.status === 'active'}
									<span class="relative flex h-1.5 w-1.5">
										<span class="animate-ping absolute inline-flex h-full w-full opacity-75" style="background: var(--color-primary);"></span>
										<span class="relative inline-flex h-1.5 w-1.5" style="background: var(--color-primary);"></span>
									</span>
									<span class="mono-text text-[10px] text-primary">{siteContent.timeline.activeLabel}</span>
								{:else if row.status === 'future'}
									<span class="mono-text text-[10px] text-white/50">{siteContent.timeline.futureLabel}</span>
								{:else}
									<span class="mono-text text-[10px] text-white/50">{siteContent.timeline.doneLabel}</span>
								{/if}
							</span>
						</div>
					{/each}
				</div>
			</Section>
		</div>


		<div use:reveal>
			<Section id="outreach">
				{#snippet title()}{siteContent.outreach.title}{/snippet}
				<div class="flex flex-col border-t" style="border-color: var(--color-rule);">
					{#each siteContent.outreach.items as item, i (i)}
						<div class="border-b flex flex-col md:flex-row items-start gap-8 py-10" style="border-color: var(--color-rule);">
							<div class="flex items-baseline gap-6 md:w-1/3 shrink-0">
								<span class="mono-text text-primary/50 w-6">{String(i + 1).padStart(2, '0')}</span>
								<h3 class="text-xl font-heading font-light text-white">{item.title}</h3>
							</div>
							<p class="text-base leading-relaxed flex-1 text-white/75 max-w-prose">{item.description}</p>
							<span class="mono-label shrink-0">{item.tag}</span>
						</div>
					{/each}
				</div>
			</Section>
		</div>


		<div use:reveal>
			<Section id="team" kicker={siteContent.team.kicker}>
				{#snippet title()}{siteContent.team.title}{/snippet}
				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t" style="border-color: var(--color-rule);">
					{#each siteContent.team.members as member, i (i)}
						{@const initials = member.name.split(' ').map((name) => name[0]).join('')}
						<div class="py-6 px-6 border-b border-r hover:bg-white/4 flex flex-col gap-4 transition-none" style="border-color: var(--color-rule);">
							<div class="w-10 h-10 flex items-center justify-center shrink-0 overflow-hidden" style="background: rgba(122,158,126,0.08); border: 1px solid rgba(122,158,126,0.2);">
								{#if member.photoUrl}<img src={member.photoUrl} alt="" class="w-full h-full object-cover" loading="lazy" />{:else}<span class="mono-text text-primary" style="font-size: 10px;">{initials}</span>{/if}
							</div>
							<div>
								<span class="block font-sans font-medium text-sm text-white leading-snug">{member.name}</span>
								<span class="mono-label mt-1 block">{member.role}</span>
							</div>
						</div>
					{/each}
				</div>
			</Section>
		</div>

		<div use:reveal>
			<Section id="results" kicker={siteContent.results.kicker}>
				{#snippet title()}{siteContent.results.title}{/snippet}
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
					<div class="liquid-panel p-12 lg:col-span-7 flex flex-col justify-between min-h-[360px] group">
						<span class="mono-label">{siteContent.results.awardLabel}</span>
						<div>
							<h3 class="text-4xl font-heading font-light text-white leading-tight mb-6 group-hover:text-primary transition-none">{siteContent.results.awardTitle}</h3>
							<p class="text-base leading-relaxed max-w-sm text-white/75">{siteContent.results.awardDescription}</p>
						</div>
					</div>
					<div class="lg:col-span-5 flex flex-col gap-6">
						{#each siteContent.results.cards as card, i (i)}
							<div class="flat-panel p-10 flex-1 flex flex-col justify-center">
								<span class="mono-label mb-4">{card.label}</span>
								<h3 class="text-2xl font-heading font-light text-white mb-3">{card.title}</h3>
								<p class="text-base leading-relaxed text-white/75">{card.description}</p>
							</div>
						{/each}
					</div>
				</div>
			</Section>
		</div>

		<div use:reveal>
			<Section id="sponsors" kicker={siteContent.sponsors.kicker}>
				{#snippet title()}{siteContent.sponsors.title}{/snippet}
				<div class="flex flex-col border-t" style="border-color: var(--color-rule);">
					<div class="grid grid-cols-1 md:grid-cols-2 border-b" style="border-color: var(--color-rule);">
						<div class="px-8 py-12 flex flex-col gap-5 border-r" style="border-color: var(--color-rule);">
							<p class="text-base leading-relaxed text-white/85" style="max-width: 42ch;">{siteContent.sponsors.introduction}</p>
							<p class="text-base leading-relaxed text-white/65" style="max-width: 42ch;">{siteContent.sponsors.contactPrompt} <br /><a href="mailto:{siteContent.contactEmail}" class="text-link inline-flex items-center gap-1" style="color: rgba(229,229,229,0.7);">Get in touch <ArrowRight size={13} /></a></p>
						</div>
						<div class="px-8 py-12 flex flex-col gap-8">
							<div class="flex flex-col gap-3">
								<span class="mono-label">{siteContent.sponsors.mentorshipTitle}</span>
								<p class="text-base leading-relaxed text-white/65" style="max-width: 38ch;">{siteContent.sponsors.mentorshipDescription}</p>
							</div>
							<div class="border-t" style="border-color: var(--color-rule);"></div>
							<div class="flex flex-col gap-3">
								<span class="mono-label">{siteContent.sponsors.facilityTitle}</span>
								<p class="text-base leading-relaxed text-white/65" style="max-width: 38ch;">{siteContent.sponsors.facilityDescription}</p>
							</div>
						</div>
					</div>
					<div class="w-full border-b" style="border-color: var(--color-rule);">
						<div class="grid border-b" style="grid-template-columns: 8rem 8rem 1fr; border-color: var(--color-rule);">
							<span class="mono-label px-6 py-3 border-r" style="border-color: var(--color-rule);">{siteContent.sponsors.tierHeader}</span>
							<span class="mono-label px-6 py-3 border-r" style="border-color: var(--color-rule);">{siteContent.sponsors.investmentHeader}</span>
							<span class="mono-label px-6 py-3">{siteContent.sponsors.inclusionsHeader}</span>
						</div>
						{#each siteContent.sponsors.tiers as tier, i (i)}
							<div class="grid border-b last:border-0 hover:bg-white/4 {i === 0 ? 'bg-primary/5' : ''}" style="grid-template-columns: 8rem 8rem 1fr; border-color: var(--color-rule); transition: none;">
								<span class="px-6 py-4 border-r font-sans text-sm font-medium text-white" style="border-color: var(--color-rule);">{tier.name}</span>
								<span class="px-6 py-4 border-r" style="font-family: var(--font-mono); font-size: 11px; color: var(--color-primary); border-color: var(--color-rule);">{tier.amount}</span>
								<span class="px-6 py-4 text-sm" style="color: rgba(229,229,229,0.7);">{#each tier.perks as perk, j (j)}{#if j > 0}<span class="mx-1 opacity-30">·</span>{/if}{perk}{/each}</span>
							</div>
						{/each}
					</div>
				</div>
			</Section>
		</div>

		<div use:reveal>
			<Contact />
		</div>

		<Footer />
	</main>
</div>

<IntroAnimation onComplete={() => (showContent = true)} />

<style>
	.marker {
		width: 1.75rem;
		height: 1.75rem;
		color: rgba(229, 229, 229, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.28);
		background: rgba(10, 10, 10, 0.88);
		box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.45);
		transition: color 200ms ease, border-color 200ms ease, transform 260ms cubic-bezier(0.2, 0.7, 0.3, 1);
	}
	:global(:root[data-theme='light']) .marker {
		color: var(--color-foreground);
		border-color: rgba(32, 40, 32, 0.4);
		background: rgba(243, 245, 240, 0.94);
		box-shadow: 0 0 0 3px rgba(243, 245, 240, 0.55);
	}
	.marker:hover { transform: translate(-50%, -50%) scale(1.08); }
	.marker.is-active {
		color: var(--color-primary);
		border-color: rgba(122, 158, 126, 0.9);
	}
	.marker-ring {
		position: absolute;
		inset: -5px;
		border: 1px solid rgba(122, 158, 126, 0.55);
		opacity: 0;
		transform: scale(0.82);
		transition: opacity 260ms ease, transform 260ms cubic-bezier(0.2, 0.7, 0.3, 1);
	}
	.marker.is-active .marker-ring { opacity: 1; transform: scale(1); }

	.detail { animation: detail-in 320ms cubic-bezier(0.2, 0.7, 0.3, 1) both; }
	@keyframes detail-in {
		from { opacity: 0; transform: translateY(6px); }
		to { opacity: 1; transform: none; }
	}

	.sub-row { transition: background-color 180ms ease, padding-left 220ms cubic-bezier(0.2, 0.7, 0.3, 1); }
	.sub-row:hover, .sub-row.is-active { background: rgba(255, 255, 255, 0.03); }
	.sub-row.is-active { padding-left: 2.5rem; }
	.sub-row :global(.sub-row-arrow) {
		color: var(--color-primary);
		opacity: 0;
		transform: translateX(-6px);
		transition: opacity 200ms ease, transform 220ms cubic-bezier(0.2, 0.7, 0.3, 1);
	}
	.sub-row.is-active :global(.sub-row-arrow) { opacity: 0.8; transform: none; }

	@media (prefers-reduced-motion: reduce) {
		.marker, .marker-ring, .sub-row, .sub-row :global(.sub-row-arrow) { transition: none; }
		.marker:hover { transform: translate(-50%, -50%); }
		.sub-row.is-active { padding-left: 2rem; }
		.detail { animation: none; }
	}
</style>
