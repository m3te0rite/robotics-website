<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		id,
		marker,
		kicker,
		title,
		variant = 'default',
		children,
	}: {
		id: string;
		marker?: string;
		kicker?: string;
		title: Snippet;
		variant?: 'default' | 'wide';
		children: Snippet;
	} = $props();
</script>

<section
	{id}
	class="relative isolate rule-x"
	style="padding-top: var(--section-padding); padding-bottom: var(--section-padding); z-index: var(--z-glass);"
>
	<div class="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-12">
		<header class="flex items-baseline justify-between border-b pb-4" style="border-color: var(--color-rule);">
			<div class="flex items-baseline gap-6">
				{#if marker}
					<span class="mono-label" style="color: rgba(229,229,229,0.25);">{marker}</span>
				{/if}
				<h2
					class="font-heading font-light tracking-tight text-white"
					style="font-size: var(--text-section-title); line-height: 0.95; text-wrap: balance;"
				>
					{@render title()}
				</h2>
			</div>
			{#if kicker}
				<span class="mono-label text-white/30 hidden md:block">{kicker}</span>
			{/if}
		</header>
		<div>{@render children()}</div>
	</div>
</section>