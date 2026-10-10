import type Lenis from 'lenis';

let _lenis: Lenis | null = null;

export async function initLenis() {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
	const { default: LenisClass } = await import('lenis');
	_lenis = new LenisClass({ duration: 1.2, smoothWheel: true, touchMultiplier: 2 });
	return _lenis;
}

export function lenisScrollTo(target: string | HTMLElement | number) {
	_lenis?.scrollTo(target as never);
}
