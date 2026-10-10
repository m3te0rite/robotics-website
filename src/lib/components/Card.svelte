<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		idx,
		title,
		children,
	}: { idx: string; title: string; children: Snippet; } = $props();
</script>

<article class="p-8 liquid-panel flex flex-col gap-8 h-full">
	<div class="flex items-baseline justify-between">
		<h3 class="font-sans text-sm tracking-wide uppercase text-white font-medium">{title}</h3>
		<span class="font-sans text-xs text-primary font-medium">{idx}</span>
	</div>
	<p class="text-sm text-white/60 leading-relaxed font-sans flex-1">
		{@render children()}
	</p>
</article>
