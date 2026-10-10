import { loadGsap } from '$lib/gsap';

const prefersReducedMotion =
	typeof window !== 'undefined'
		? window.matchMedia('(prefers-reduced-motion: reduce)').matches
		: false;

export function reveal(node: HTMLElement) {
	if (prefersReducedMotion) return;

	let cleanup: (() => void) | undefined;

	(async () => {
		const gsap = await loadGsap();
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.set(node, { opacity: 0, y: 40 });
		const t = ScrollTrigger.create({
			trigger: node,
			start: 'top 88%',
			once: true,
			onEnter: () => gsap.to(node, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
		});
		cleanup = () => t.kill();
	})();

	return {
		destroy() {
			cleanup?.();
		}
	};
}

export function magnetic(
	node: HTMLElement,
	{ strength = 0.18 }: { strength?: number } = {}
) {
	if (prefersReducedMotion) return;

	let xTo: ((v: number) => void) | undefined;
	let yTo: ((v: number) => void) | undefined;

	loadGsap().then((gsap) => {
		xTo = gsap.quickTo(node, 'x', { duration: 0.6, ease: 'power3' }) as (v: number) => void;
		yTo = gsap.quickTo(node, 'y', { duration: 0.6, ease: 'power3' }) as (v: number) => void;
	});

	function onPointerMove(e: PointerEvent) {
		if (!xTo || !yTo) return;
		const rect = node.getBoundingClientRect();
		xTo((e.clientX - (rect.left + rect.width / 2)) * strength);
		yTo((e.clientY - (rect.top + rect.height / 2)) * strength);
	}

	function onPointerLeave() {
		xTo?.(0);
		yTo?.(0);
	}

	node.addEventListener('pointermove', onPointerMove);
	node.addEventListener('pointerleave', onPointerLeave);

	return {
		destroy() {
			node.removeEventListener('pointermove', onPointerMove);
			node.removeEventListener('pointerleave', onPointerLeave);
		}
	};
}
