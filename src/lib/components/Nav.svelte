<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { Menu, X } from 'lucide-svelte';
	import { magnetic } from '$lib/actions';
	import { lenisScrollTo } from '$lib/scroll';
	import { siteContent } from '$lib/site-content.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	function handleAnchor(e: MouseEvent, href: string) {
		if (!href.startsWith('#')) return;
		e.preventDefault();
		const target = document.querySelector<HTMLElement>(href);
		if (target) lenisScrollTo(target);
	}

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);
	let menuEl = $state<HTMLDivElement | undefined>(undefined);

	onMount(() => {
		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				window.requestAnimationFrame(() => {
					scrolled = window.scrollY > 20;
					ticking = false;
				});
				ticking = true;
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	async function animateMenu(open: boolean) {
		const { loadGsap } = await import('$lib/gsap');
		const gsap = await loadGsap();
		if (!menuEl) {
			if (!open) mobileMenuOpen = false;
			return;
		}

		if (open) {
			gsap.fromTo(menuEl, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.7)' });
		} else {
			gsap.to(menuEl, { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in', onComplete: () => { mobileMenuOpen = false; } });
		}
	}

	function closeMenu() { void animateMenu(false); }
	function toggleMenu() {
		if (mobileMenuOpen) {
			closeMenu();
		} else {
			mobileMenuOpen = true;
		}
	}
</script>

<div class="fixed top-0 w-full px-3 md:px-6 transition-[padding] duration-300 {scrolled ? 'pt-3 md:pt-4' : 'pt-4 md:pt-8'} pointer-events-none" style="z-index: var(--z-nav);">
	<nav class="max-w-5xl mx-auto liquid-panel liquid-panel-blur flex items-center justify-between px-6 py-3 pointer-events-auto shadow-2xl relative" style="background: var(--color-card); border-color: var(--color-rule);">
		<a href={resolve('/')} class="flex items-center gap-3 group shrink-0">
			<img src={siteContent.teamLogoUrl} alt="{siteContent.teamName} logo" class="h-6 w-6 shrink-0 object-contain" />
			<span class="mono-label group-hover:text-primary transition-colors">{siteContent.teamNumber}</span>
			<span class="font-heading text-sm font-light tracking-wide text-white/70 hidden sm:block group-hover:text-white transition-colors">{siteContent.teamName}</span>
		</a>

		<div class="hidden md:flex items-center gap-4">
			<span use:magnetic><a href={resolve('/#about')} onclick={(e) => handleAnchor(e, '#about')} class="text-[11px] font-sans tracking-wider uppercase text-white/70 hover:text-white transition-colors font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{siteContent.navigation.about}</a></span>
			<span use:magnetic><a href={resolve('/#robot')} onclick={(e) => handleAnchor(e, '#robot')} class="text-[11px] font-sans tracking-wider uppercase text-white/70 hover:text-white transition-colors font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{siteContent.navigation.robot}</a></span>
			<span use:magnetic><a href={resolve('/#season')} onclick={(e) => handleAnchor(e, '#season')} class="text-[11px] font-sans tracking-wider uppercase text-white/70 hover:text-white transition-colors font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{siteContent.navigation.timeline}</a></span>
			<span use:magnetic><a href={resolve('/#outreach')} onclick={(e) => handleAnchor(e, '#outreach')} class="text-[11px] font-sans tracking-wider uppercase text-white/70 hover:text-white transition-colors font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{siteContent.navigation.outreach}</a></span>
			<span use:magnetic><a href={resolve('/#team')} onclick={(e) => handleAnchor(e, '#team')} class="text-[11px] font-sans tracking-wider uppercase text-white/70 hover:text-white transition-colors font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{siteContent.navigation.team}</a></span>
			<span use:magnetic><a href={resolve('/#results')} onclick={(e) => handleAnchor(e, '#results')} class="text-[11px] font-sans tracking-wider uppercase text-white/70 hover:text-white transition-colors font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{siteContent.navigation.results}</a></span>
			<span use:magnetic><a href={resolve('/#sponsors')} onclick={(e) => handleAnchor(e, '#sponsors')} class="text-[11px] font-sans tracking-wider uppercase text-white/70 hover:text-white transition-colors font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">{siteContent.navigation.sponsors}</a></span>
			<span use:magnetic>
				<a href={resolve('/#contact')} onclick={(e) => handleAnchor(e, '#contact')} class="text-[11px] font-sans tracking-wider uppercase text-white bg-white/10 hover:bg-white/20 px-4 py-2 transition-none font-medium border border-white/5 ml-2">
					{siteContent.navigation.contact}
				</a>
			</span>
			<a href={resolve('/admin')} class="text-[11px] font-sans tracking-wider uppercase text-white/70 hover:text-white transition-colors font-medium">Admin</a>
			<ThemeToggle />
		</div>

		<div class="flex items-center gap-3 md:hidden">
			<ThemeToggle />
			<button class="text-white p-1" onclick={toggleMenu} aria-label="Toggle menu">
				{#if mobileMenuOpen}<X size={20} />{:else}<Menu size={20} />{/if}
			</button>
		</div>
	</nav>

	{#if mobileMenuOpen}
		<div bind:this={menuEl} class="absolute top-full left-6 right-6 mt-4 liquid-panel liquid-panel-blur p-6 flex flex-col gap-6 md:hidden pointer-events-auto">
			<a href={resolve('/#about')} onclick={(e) => { handleAnchor(e, '#about'); closeMenu(); }} class="text-sm font-sans tracking-widest uppercase text-white/80 hover:text-white font-medium">{siteContent.navigation.about}</a>
			<a href={resolve('/#robot')} onclick={(e) => { handleAnchor(e, '#robot'); closeMenu(); }} class="text-sm font-sans tracking-widest uppercase text-white/80 hover:text-white font-medium">{siteContent.navigation.robot}</a>
			<a href={resolve('/#season')} onclick={(e) => { handleAnchor(e, '#season'); closeMenu(); }} class="text-sm font-sans tracking-widest uppercase text-white/80 hover:text-white font-medium">{siteContent.navigation.timeline}</a>
			<a href={resolve('/#outreach')} onclick={(e) => { handleAnchor(e, '#outreach'); closeMenu(); }} class="text-sm font-sans tracking-widest uppercase text-white/80 hover:text-white font-medium">{siteContent.navigation.outreach}</a>
			<a href={resolve('/#team')} onclick={(e) => { handleAnchor(e, '#team'); closeMenu(); }} class="text-sm font-sans tracking-widest uppercase text-white/80 hover:text-white font-medium">{siteContent.navigation.team}</a>
			<a href={resolve('/#results')} onclick={(e) => { handleAnchor(e, '#results'); closeMenu(); }} class="text-sm font-sans tracking-widest uppercase text-white/80 hover:text-white font-medium">{siteContent.navigation.results}</a>
			<a href={resolve('/#sponsors')} onclick={(e) => { handleAnchor(e, '#sponsors'); closeMenu(); }} class="text-sm font-sans tracking-widest uppercase text-white/80 hover:text-white font-medium">{siteContent.navigation.sponsors}</a>
			<a href={resolve('/admin')} class="text-sm font-sans tracking-widest uppercase text-white/80 hover:text-white font-medium">Admin</a>
			<a href={resolve('/#contact')} onclick={(e) => { handleAnchor(e, '#contact'); closeMenu(); }} class="text-sm font-sans tracking-widest uppercase text-primary font-medium mt-2">{siteContent.navigation.contact}</a>
		</div>
	{/if}
</div>