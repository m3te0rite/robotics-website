<script lang="ts">
	let { label, value = $bindable('') }: { label: string; value?: string } = $props();
	let uploading = $state(false);
	let errorMessage = $state('');

	async function uploadImage(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		errorMessage = '';
		uploading = true;
		try {
			const form = new FormData();
			form.set('file', file);
			const response = await fetch('/api/admin/assets', { method: 'POST', body: form });
			const result = await response.json();
			if (!response.ok) throw new Error(result.error ?? 'Image upload failed.');
			value = result.url;
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Image upload failed.';
		} finally {
			uploading = false;
			input.value = '';
		}
	}
</script>

<div class="admin-image-field">
	<span class="admin-field-label">{label}</span>
	{#if value}<img
			class="admin-image-preview"
			src={value}
			alt="Current {label}"
			loading="lazy"
		/>{/if}
	<input aria-label="{label} image URL" bind:value />
	<label class="admin-upload-button">
		{uploading ? 'Uploading...' : 'Choose image'}
		<input
			type="file"
			accept="image/png,image/jpeg,image/webp"
			onchange={uploadImage}
			disabled={uploading}
		/>
	</label>
	<span class="admin-upload-note">PNG, JPG, or WebP. Maximum 3 MB.</span>
	{#if errorMessage}<span class="admin-field-error" role="alert">{errorMessage}</span>{/if}
</div>
