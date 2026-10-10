import type { gsap as GsapType } from 'gsap';

let _gsap: typeof GsapType | null = null;
let _promise: Promise<typeof GsapType> | null = null;

export function loadGsap(): Promise<typeof GsapType> {
	if (_gsap) return Promise.resolve(_gsap);
	if (!_promise) {
		_promise = import('gsap').then(async ({ gsap }) => {
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);
			_gsap = gsap;
			return gsap;
		});
	}
	return _promise;
}
