<script lang="ts">
	import Section from './Section.svelte';
	import GlassButton from './GlassButton.svelte';
	import { magnetic } from '$lib/actions';
	import { CONTACT_SCRIPT_URL } from '$lib/config';
	import { siteContent } from '$lib/site-content.svelte';
	import { Mail, MapPin } from 'lucide-svelte';

	type Status = 'idle' | 'sending' | 'success' | 'error';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let status = $state<Status>('idle');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!CONTACT_SCRIPT_URL) return;
		status = 'sending';
		try {
			const fd = new FormData();
			fd.append('name', name);
			fd.append('email', email);
			fd.append('message', message);
			await fetch(CONTACT_SCRIPT_URL, { method: 'POST', body: fd, mode: 'no-cors' });
			status = 'success';
			name = '';
			email = '';
			message = '';
		} catch {
			status = 'error';
		}
	}
</script>

<Section id="contact">
	{#snippet title()}{siteContent.contactTitle}{/snippet}
	<div class="liquid-panel p-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
		<div class="flex flex-col gap-12">
			<p class="text-sm leading-relaxed max-w-sm" style="color: rgba(229,229,229,0.7);">
				{siteContent.contactDescription}
			</p>

			<div class="flex flex-col gap-6">
				<dl class="flex flex-col gap-2">
					<dt class="mono-label flex items-center gap-1.5"><Mail size={11} />Email</dt>
					<dd class="text-sm font-sans wrap-break-word" style="color: rgba(229,229,229,0.9);">
						<a href="mailto:{siteContent.contactEmail}" class="hover:text-white transition-colors">{siteContent.contactEmail}</a>
					</dd>
				</dl>
				<dl class="flex flex-col gap-2">
					<dt class="mono-label flex items-center gap-1.5"><MapPin size={11} />Location</dt>
					<dd class="text-sm font-sans" style="color: rgba(229,229,229,0.9);">{siteContent.location}</dd>
				</dl>
			</div>
		</div>

		<form onsubmit={handleSubmit} class="flex flex-col gap-5">
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
				<label class="flex flex-col gap-2">
					<span class="mono-label">Name</span>
					<input
						type="text"
						name="name"
						bind:value={name}
						required
						autocomplete="name"
						class="bg-white/3 border px-4 py-3 text-sm text-white font-sans placeholder:text-white/25 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						style="border-color: rgba(255,255,255,0.08);"
						placeholder="Your name"
					/>
				</label>
				<label class="flex flex-col gap-2">
					<span class="mono-label">Email</span>
					<input
						type="email"
						name="email"
						bind:value={email}
						required
						autocomplete="email"
						class="bg-white/3 border px-4 py-3 text-sm text-white font-sans placeholder:text-white/25 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						style="border-color: rgba(255,255,255,0.08);"
						placeholder="your@email.com"
					/>
				</label>
			</div>
			<label class="flex flex-col gap-2">
				<span class="mono-label">Message</span>
				<textarea
					name="message"
					bind:value={message}
					required
					rows={5}
					class="bg-white/3 border px-4 py-3 text-sm text-white font-sans placeholder:text-white/25 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
					style="border-color: rgba(255,255,255,0.08);"
					placeholder="Tell us about your interest…"
				></textarea>
			</label>

			<div class="flex items-center gap-6 mt-2">
				<span use:magnetic={{ strength: 0.12 }}>
					<GlassButton
						variant="primary"
						type="submit"
						disabled={status === 'sending' || !CONTACT_SCRIPT_URL}
						class="px-10"
					>
						{status === 'sending' ? 'Sending…' : 'Send Message'}
					</GlassButton>
				</span>

				{#if status === 'success'}
					<span class="mono-label" style="color: var(--color-primary);">Sent — we'll be in touch.</span>
				{:else if status === 'error'}
					<span class="mono-label" style="color: rgba(229,100,100,0.8);">Something went wrong. Try again.</span>
				{/if}
			</div>
		</form>
	</div>
</Section>
