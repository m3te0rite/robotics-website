import { render, cleanup } from '@testing-library/svelte';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { flushSync } from 'svelte';
import IntroAnimation from '../components/IntroAnimation.svelte';

describe('IntroAnimation', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		sessionStorage.clear();
	});

	afterEach(() => {
		flushSync();
		cleanup();
		vi.useRealTimers();
	});

	it('renders intro overlay on mount', () => {
		render(IntroAnimation, {});
		expect(document.querySelector('[aria-label="Skip intro"]')).toBeInTheDocument();
	});

	it('does not call onComplete before 1800ms', async () => {
		const onComplete = vi.fn();
		render(IntroAnimation, { onComplete });
		await vi.advanceTimersByTimeAsync(1799);
		expect(onComplete).not.toHaveBeenCalled();
	});

	it('calls onComplete at 1800ms', async () => {
		const onComplete = vi.fn();
		render(IntroAnimation, { onComplete });
		await vi.advanceTimersByTimeAsync(1800);
		expect(onComplete).toHaveBeenCalledOnce();
	});

	it('skip() calls onComplete immediately and sets sessionStorage', async () => {
		const onComplete = vi.fn();
		const { getByRole } = render(IntroAnimation, { onComplete });
		await vi.advanceTimersByTimeAsync(500);
		getByRole('button', { name: 'Skip intro' }).click();
		expect(onComplete).toHaveBeenCalledOnce();
		expect(sessionStorage.getItem('introPlayed')).toBe('true');
	});

	it('skips intro immediately when sessionStorage flag is set', async () => {
		sessionStorage.setItem('introPlayed', 'true');
		const onComplete = vi.fn();
		render(IntroAnimation, { onComplete });
		await vi.advanceTimersByTimeAsync(0);
		expect(onComplete).toHaveBeenCalledOnce();
	});

	it('clears all timeouts on destroy', () => {
		const spy = vi.spyOn(global, 'clearTimeout');
		const { unmount } = render(IntroAnimation, {});
		unmount();
		expect(spy).toHaveBeenCalled();
	});
});
