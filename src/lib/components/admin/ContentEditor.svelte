<script lang="ts">
	import { RotateCcw, Save, Plus, Trash2 } from 'lucide-svelte';
	import ImageUploadField from './ImageUploadField.svelte';
	import { DEFAULT_SITE_CONTENT } from '$lib/site-content';
	import { saveSiteContent, siteContent } from '$lib/site-content.svelte';

	let saving = $state(false);
	let saved = $state(false);
	let errorMessage = $state('');

	async function save() {
		saving = true;
		saved = false;
		errorMessage = '';
		try {
			await saveSiteContent();
			saved = true;
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'Unable to save changes.';
		} finally {
			saving = false;
		}
	}

	async function reset() {
		Object.assign(siteContent, structuredClone(DEFAULT_SITE_CONTENT));
		await save();
	}

	function removeItem(items: unknown[], index: number) {
		items.splice(index, 1);
		saved = false;
	}
</script>

<div class="content-editor">
	<div class="admin-actions editor-toolbar">
		<button class="admin-button admin-primary" type="button" onclick={save} disabled={saving}>
			<Save size={15} />
			{saving ? 'Saving...' : 'Save changes'}
		</button>
		<button class="admin-button" type="button" onclick={reset} disabled={saving}>
			<RotateCcw size={15} /> Reset defaults
		</button>
		{#if saved}<span class="save-status" role="status">Published</span>{/if}
	</div>

	<details class="admin-section" open>
		<summary>Team identity and hero</summary>
		<div class="admin-fields">
			<label>Team name<input bind:value={siteContent.teamName} /></label>
			<label>Team number<input bind:value={siteContent.teamNumber} /></label>
			<label>Location<input bind:value={siteContent.location} /></label>
			<label>League / region<input bind:value={siteContent.league} /></label>
			<label>Hero heading, line 1<input bind:value={siteContent.heroTitle} /></label>
			<label>Hero heading, line 2<input bind:value={siteContent.heroSecondLine} /></label>
			<label
				>Hero introduction<textarea rows="3" bind:value={siteContent.heroSubtitle}
				></textarea></label
			>
			<label>Build button label<input bind:value={siteContent.heroBuildLabel} /></label>
			<label>Season button label<input bind:value={siteContent.heroSeasonLabel} /></label>
			<ImageUploadField label="Team logo" bind:value={siteContent.teamLogoUrl} />
			<ImageUploadField label="Hero background image" bind:value={siteContent.heroBackgroundUrl} />
		</div>
		<h3 class="admin-subheading">Navigation labels</h3>
		<div class="admin-fields">
			<label>About<input bind:value={siteContent.navigation.about} /></label>
			<label>Robot<input bind:value={siteContent.navigation.robot} /></label>
			<label>Timeline<input bind:value={siteContent.navigation.timeline} /></label>
			<label>Outreach<input bind:value={siteContent.navigation.outreach} /></label>
			<label>Team<input bind:value={siteContent.navigation.team} /></label>
			<label>Results<input bind:value={siteContent.navigation.results} /></label>
			<label>Sponsors<input bind:value={siteContent.navigation.sponsors} /></label>
			<label>Contact<input bind:value={siteContent.navigation.contact} /></label>
		</div>
	</details>

	<details class="admin-section">
		<summary>About and quick stats</summary>
		<div class="admin-fields">
			<label>Section title<input bind:value={siteContent.aboutTitle} /></label>
			<label class="admin-wide"
				>About description<textarea rows="4" bind:value={siteContent.aboutDescription}
				></textarea></label
			>
		</div>
		<div class="admin-list-heading">
			<h3>Stats</h3>
			<button
				class="admin-icon-button"
				type="button"
				title="Add stat"
				aria-label="Add stat"
				onclick={() => siteContent.stats.push({ value: '', label: '' })}><Plus size={16} /></button
			>
		</div>
		{#each siteContent.stats as stat, i (i)}
			<div class="admin-edit-row">
				<label>Value<input bind:value={stat.value} /></label>
				<label>Label<input bind:value={stat.label} /></label>
				<button
					class="admin-icon-button admin-remove"
					type="button"
					title="Remove stat"
					aria-label="Remove stat"
					onclick={() => removeItem(siteContent.stats, i)}><Trash2 size={16} /></button
				>
			</div>
		{/each}
	</details>

	<details class="admin-section">
		<summary>Robot and build details</summary>
		<div class="admin-fields">
			<label>Section title<input bind:value={siteContent.robot.title} /></label>
			<label>Section kicker<input bind:value={siteContent.robot.kicker} /></label>
			<label>Image description<input bind:value={siteContent.robot.imageAlt} /></label>
			<label>Subsystems heading<input bind:value={siteContent.robot.subsystemsLabel} /></label>
			<label>Specs heading<input bind:value={siteContent.robot.specsTitle} /></label>
			<label>Software heading<input bind:value={siteContent.robot.softwareTitle} /></label>
			<label>Hardware heading<input bind:value={siteContent.robot.hardwareTitle} /></label>
			<label>Strategy heading<input bind:value={siteContent.robot.strategyTitle} /></label>
			<ImageUploadField label="Robot image" bind:value={siteContent.robot.imageUrl} />
			<label class="admin-wide"
				>Software introduction<textarea rows="2" bind:value={siteContent.robot.softwareIntro}
				></textarea></label
			>
			<label
				>Hardware description<textarea rows="3" bind:value={siteContent.robot.hardwareDescription}
				></textarea></label
			>
			<label>Hardware tag<input bind:value={siteContent.robot.hardwareTag} /></label>
			<label
				>Strategy description<textarea rows="3" bind:value={siteContent.robot.strategyDescription}
				></textarea></label
			>
			<label>Strategy tag<input bind:value={siteContent.robot.strategyTag} /></label>
		</div>
		<div class="admin-list-heading">
			<h3>Robot subsystems and image markers</h3>
			<button
				class="admin-icon-button"
				type="button"
				title="Add subsystem"
				aria-label="Add subsystem"
				onclick={() =>
					siteContent.robot.subsystems.push({ label: '', description: '', x: 50, y: 50 })}
				><Plus size={16} /></button
			>
		</div>
		{#each siteContent.robot.subsystems as system, i (i)}
			<div class="admin-edit-block">
				<div class="admin-edit-row">
					<label>Name<input bind:value={system.label} /></label>
					<label
						>Marker left (%)<input type="number" min="0" max="100" bind:value={system.x} /></label
					>
					<label
						>Marker top (%)<input type="number" min="0" max="100" bind:value={system.y} /></label
					>
					<button
						class="admin-icon-button admin-remove"
						type="button"
						title="Remove subsystem"
						aria-label="Remove subsystem"
						onclick={() => removeItem(siteContent.robot.subsystems, i)}><Trash2 size={16} /></button
					>
				</div>
				<label>Description<textarea rows="3" bind:value={system.description}></textarea></label>
			</div>
		{/each}
		<div class="admin-list-heading">
			<h3>Robot specifications</h3>
			<button
				class="admin-icon-button"
				type="button"
				title="Add specification"
				aria-label="Add specification"
				onclick={() => siteContent.robot.specs.push({ label: '', value: '' })}
				><Plus size={16} /></button
			>
		</div>
		{#each siteContent.robot.specs as row, i (i)}
			<div class="admin-edit-row">
				<label>Label<input bind:value={row.label} /></label><label
					>Value<input bind:value={row.value} /></label
				>
				<button
					class="admin-icon-button admin-remove"
					type="button"
					title="Remove specification"
					aria-label="Remove specification"
					onclick={() => removeItem(siteContent.robot.specs, i)}><Trash2 size={16} /></button
				>
			</div>
		{/each}
		<div class="admin-list-heading">
			<h3>Software</h3>
			<button
				class="admin-icon-button"
				type="button"
				title="Add software detail"
				aria-label="Add software detail"
				onclick={() => siteContent.robot.software.push({ label: '', value: '' })}
				><Plus size={16} /></button
			>
		</div>
		{#each siteContent.robot.software as row, i (i)}
			<div class="admin-edit-row">
				<label>Label<input bind:value={row.label} /></label><label
					>Value<input bind:value={row.value} /></label
				>
				<button
					class="admin-icon-button admin-remove"
					type="button"
					title="Remove software detail"
					aria-label="Remove software detail"
					onclick={() => removeItem(siteContent.robot.software, i)}><Trash2 size={16} /></button
				>
			</div>
		{/each}
	</details>

	<details class="admin-section">
		<summary>Season timeline</summary>
		<div class="admin-fields">
			<label>Section title<input bind:value={siteContent.timeline.title} /></label><label
				>Section kicker<input bind:value={siteContent.timeline.kicker} /></label
			>
			<label>Month column<input bind:value={siteContent.timeline.monthHeader} /></label><label
				>Event column<input bind:value={siteContent.timeline.eventHeader} /></label
			>
			<label>Status column<input bind:value={siteContent.timeline.statusHeader} /></label><label
				>Active status label<input bind:value={siteContent.timeline.activeLabel} /></label
			>
			<label>Future status label<input bind:value={siteContent.timeline.futureLabel} /></label
			><label>Completed status label<input bind:value={siteContent.timeline.doneLabel} /></label>
		</div>
		<div class="admin-list-heading">
			<h3>Timeline events</h3>
			<button
				class="admin-icon-button"
				type="button"
				title="Add event"
				aria-label="Add event"
				onclick={() => siteContent.timeline.rows.push({ month: '', event: '', status: 'future' })}
				><Plus size={16} /></button
			>
		</div>
		{#each siteContent.timeline.rows as row, i (i)}
			<div class="admin-edit-row admin-timeline-row">
				<label>Month<input bind:value={row.month} /></label>
				<label>Event description<input bind:value={row.event} /></label>
				<label
					>Status<select bind:value={row.status}
						><option value="active">Active</option><option value="future">Future</option><option
							value="done">Done</option
						></select
					></label
				>
				<button
					class="admin-icon-button admin-remove"
					type="button"
					title="Remove event"
					aria-label="Remove event"
					onclick={() => removeItem(siteContent.timeline.rows, i)}><Trash2 size={16} /></button
				>
			</div>
		{/each}
	</details>

	<details class="admin-section">
		<summary>Beyond competition</summary>
		<div class="admin-fields">
			<label>Section title<input bind:value={siteContent.outreach.title} /></label>
		</div>
		<div class="admin-list-heading">
			<h3>Outreach activities</h3>
			<button
				class="admin-icon-button"
				type="button"
				title="Add activity"
				aria-label="Add activity"
				onclick={() => siteContent.outreach.items.push({ title: '', description: '', tag: '' })}
				><Plus size={16} /></button
			>
		</div>
		{#each siteContent.outreach.items as item, i (i)}
			<div class="admin-edit-block">
				<div class="admin-edit-row">
					<label>Title<input bind:value={item.title} /></label><label
						>Tag<input bind:value={item.tag} /></label
					><button
						class="admin-icon-button admin-remove"
						type="button"
						title="Remove activity"
						aria-label="Remove activity"
						onclick={() => removeItem(siteContent.outreach.items, i)}><Trash2 size={16} /></button
					>
				</div>
				<label>Description<textarea rows="3" bind:value={item.description}></textarea></label>
			</div>
		{/each}
	</details>

	<details class="admin-section">
		<summary>Team roster</summary>
		<div class="admin-fields">
			<label>Section title<input bind:value={siteContent.team.title} /></label><label
				>Section kicker<input bind:value={siteContent.team.kicker} /></label
			>
		</div>
		<div class="admin-list-heading">
			<h3>Members</h3>
			<button
				class="admin-icon-button"
				type="button"
				title="Add member"
				aria-label="Add member"
				onclick={() => siteContent.team.members.push({ name: '', role: '', photoUrl: '' })}
				><Plus size={16} /></button
			>
		</div>
		{#each siteContent.team.members as member, i (i)}
			<div class="admin-edit-block">
				<div class="admin-edit-row">
					<label>Name<input bind:value={member.name} /></label><label
						>Role<input bind:value={member.role} /></label
					><button
						class="admin-icon-button admin-remove"
						type="button"
						title="Remove member"
						aria-label="Remove member"
						onclick={() => removeItem(siteContent.team.members, i)}><Trash2 size={16} /></button
					>
				</div>
				<ImageUploadField label="Member photo" bind:value={member.photoUrl} />
			</div>
		{/each}
	</details>

	<details class="admin-section">
		<summary>Season results</summary>
		<div class="admin-fields">
			<label>Section title<input bind:value={siteContent.results.title} /></label><label
				>Section kicker<input bind:value={siteContent.results.kicker} /></label
			>
			<label>Award label<input bind:value={siteContent.results.awardLabel} /></label><label
				>Award title<input bind:value={siteContent.results.awardTitle} /></label
			>
			<label class="admin-wide"
				>Award description<textarea rows="3" bind:value={siteContent.results.awardDescription}
				></textarea></label
			>
		</div>
		<div class="admin-list-heading">
			<h3>Other results</h3>
			<button
				class="admin-icon-button"
				type="button"
				title="Add result"
				aria-label="Add result"
				onclick={() => siteContent.results.cards.push({ label: '', title: '', description: '' })}
				><Plus size={16} /></button
			>
		</div>
		{#each siteContent.results.cards as card, i (i)}
			<div class="admin-edit-block">
				<div class="admin-edit-row">
					<label>Label<input bind:value={card.label} /></label><label
						>Title<input bind:value={card.title} /></label
					><button
						class="admin-icon-button admin-remove"
						type="button"
						title="Remove result"
						aria-label="Remove result"
						onclick={() => removeItem(siteContent.results.cards, i)}><Trash2 size={16} /></button
					>
				</div>
				<label>Description<textarea rows="3" bind:value={card.description}></textarea></label>
			</div>
		{/each}
	</details>

	<details class="admin-section">
		<summary>Sponsorship</summary>
		<div class="admin-fields">
			<label>Section title<input bind:value={siteContent.sponsors.title} /></label><label
				>Section kicker<input bind:value={siteContent.sponsors.kicker} /></label
			>
			<label class="admin-wide"
				>Introduction<textarea rows="3" bind:value={siteContent.sponsors.introduction}
				></textarea></label
			>
			<label>Mentorship title<input bind:value={siteContent.sponsors.mentorshipTitle} /></label
			><label>Facility tours title<input bind:value={siteContent.sponsors.facilityTitle} /></label>
			<label
				>Mentorship description<textarea
					rows="3"
					bind:value={siteContent.sponsors.mentorshipDescription}
				></textarea></label
			>
			<label
				>Facility tours description<textarea
					rows="3"
					bind:value={siteContent.sponsors.facilityDescription}
				></textarea></label
			>
			<label>Sponsor contact prompt<input bind:value={siteContent.sponsors.contactPrompt} /></label>
			<label>Tier column heading<input bind:value={siteContent.sponsors.tierHeader} /></label>
			<label
				>Investment column heading<input
					bind:value={siteContent.sponsors.investmentHeader}
				/></label
			>
			<label
				>Inclusions column heading<input
					bind:value={siteContent.sponsors.inclusionsHeader}
				/></label
			>
		</div>
		<div class="admin-list-heading">
			<h3>Sponsor tiers</h3>
			<button
				class="admin-icon-button"
				type="button"
				title="Add tier"
				aria-label="Add tier"
				onclick={() => siteContent.sponsors.tiers.push({ name: '', amount: '', perks: [''] })}
				><Plus size={16} /></button
			>
		</div>
		{#each siteContent.sponsors.tiers as tier, i (i)}
			<div class="admin-edit-block">
				<div class="admin-edit-row">
					<label>Tier name<input bind:value={tier.name} /></label><label
						>Investment<input bind:value={tier.amount} /></label
					><button
						class="admin-icon-button admin-remove"
						type="button"
						title="Remove tier"
						aria-label="Remove tier"
						onclick={() => removeItem(siteContent.sponsors.tiers, i)}><Trash2 size={16} /></button
					>
				</div>
				<div class="admin-list-heading">
					<h3>What sponsors receive</h3>
					<button
						class="admin-icon-button"
						type="button"
						title="Add inclusion"
						aria-label="Add inclusion"
						onclick={() => tier.perks.push('')}><Plus size={16} /></button
					>
				</div>
				{#each tier.perks.keys() as j (j)}
					<div class="admin-edit-row">
						<label class="admin-wide">Inclusion<input bind:value={tier.perks[j]} /></label><button
							class="admin-icon-button admin-remove"
							type="button"
							title="Remove inclusion"
							aria-label="Remove inclusion"
							onclick={() => removeItem(tier.perks, j)}><Trash2 size={16} /></button
						>
					</div>
				{/each}
			</div>
		{/each}
	</details>

	<details class="admin-section">
		<summary>Contact</summary>
		<div class="admin-fields">
			<label>Section title<input bind:value={siteContent.contactTitle} /></label>
			<label>Contact email<input type="email" bind:value={siteContent.contactEmail} /></label>
			<label class="admin-wide"
				>Introduction<textarea rows="3" bind:value={siteContent.contactDescription}
				></textarea></label
			>
		</div>
	</details>

	<div class="admin-actions editor-footer">
		<button class="admin-button admin-primary" type="button" onclick={save} disabled={saving}
			><Save size={15} /> {saving ? 'Saving...' : 'Save changes'}</button
		>
		{#if saved}<span class="save-status" role="status">Published</span>{/if}
	</div>
	{#if errorMessage}<p class="admin-error" role="alert">{errorMessage}</p>{/if}
</div>
