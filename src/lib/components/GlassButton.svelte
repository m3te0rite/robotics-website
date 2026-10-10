<script lang="ts">
	import { cn } from '$lib/utils';
	import { tv, type VariantProps } from 'tailwind-variants';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const glassButtonVariants = tv({
		base: 'relative isolate cursor-pointer flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background border overflow-hidden',
		variants: {
			size: {
				default: 'px-6 py-3 text-sm font-medium tracking-wide',
				sm: 'px-4 py-2 text-xs font-medium tracking-wide',
				lg: 'px-8 py-4 text-sm font-medium tracking-wide',
				icon: 'h-10 w-10 flex items-center justify-center'
			},
			variant: {
				default: 'bg-white/[0.02] text-foreground border-white/[0.06] shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/[0.06] hover:border-white/[0.12] hover:shadow-[0_8px_24px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-3xl',
				primary: 'bg-primary/80 text-white border-primary-foreground/10 shadow-[0_4px_16px_rgba(74,89,77,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-primary hover:shadow-[0_8px_24px_rgba(74,89,77,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl',
				ghost: 'border-transparent text-foreground/80 hover:text-foreground hover:bg-white/5 shadow-none'
			}
		},
		defaultVariants: {
			size: 'default',
			variant: 'default'
		}
	});

	type Variant = VariantProps<typeof glassButtonVariants>['variant'];
	type Size = VariantProps<typeof glassButtonVariants>['size'];

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		class?: string;
		href?: string;
		children?: Snippet;
	}

	let { variant = 'default', size = 'default', class: className, href, children, ...rest }: Props = $props();

	const cls = $derived(cn(glassButtonVariants({ variant, size }), "group active:scale-95", className));
</script>

{#if href}
	<a {href} class={cls} style="transition: none;">
		<span class="relative z-10 block font-sans">{@render children?.()}</span>
	</a>
{:else}
	<button class={cls} style="transition: none;" {...rest}>
		<span class="relative z-10 block font-sans">{@render children?.()}</span>
	</button>
{/if}