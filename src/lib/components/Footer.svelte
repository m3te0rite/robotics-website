<script>
	import { ExternalLink } from 'lucide-svelte';
	import { siteContent } from '$lib/site-content.svelte';
</script>

<footer class="border-t bg-background pt-24 pb-12 relative overflow-hidden" style="border-color: var(--color-rule);">
	<div class="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 items-baseline relative" style="z-index: var(--z-glass);">
		<div class="flex items-baseline gap-4">
			<span class="mono-label" style="font-size: 13px;">FTC {siteContent.teamNumber}</span>
			<span class="mono-label" style="color: rgba(229,229,229,0.4);">{siteContent.teamName} / {siteContent.location}</span>
		</div>

		<div class="flex items-center md:justify-center gap-6 mono-label" style="color: rgba(229,229,229,0.4);">
			<span>2026</span>
			<span class="w-1 h-1 bg-white/10"></span>
			<a
				href="https://www.firstinspires.org/robotics/ftc"
				target="_blank"
				rel="noopener noreferrer"
				class="text-link hover:text-white inline-flex items-center gap-1"
			>FIRST Tech Challenge <ExternalLink size={11} /></a>
		</div>

		<div class="flex md:justify-end">
			<a href="https://www.firstinspires.org/robotics/ftc" target="_blank" rel="noopener noreferrer" class="mono-label hover:text-white inline-flex items-center gap-1" style="color: rgba(229,229,229,0.55);">FTC <ExternalLink size={11} /></a>
		</div>
	</div>
</footer>
