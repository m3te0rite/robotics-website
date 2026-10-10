import { describe, expect, it } from 'vitest';
import { DEFAULT_SITE_CONTENT, parseSiteContent } from '../site-content';

describe('parseSiteContent', () => {
	it('fills new sections from defaults when reading an older saved profile', () => {
		const content = parseSiteContent({
			teamName: 'Example Team',
			teamNumber: '12345',
			location: 'Example City',
			season: '2025-26',
			heroTitle: 'Building',
			heroSubtitle: 'A student robotics team.',
			aboutTitle: 'About',
			aboutDescription: 'A team description.',
			contactEmail: 'team@example.com'
		});

		expect(content?.teamName).toBe('Example Team');
		expect(content?.heroTitle).toBe('Building');
		expect(content?.stats).toEqual(DEFAULT_SITE_CONTENT.stats);
		expect(content?.robot.subsystems).toEqual(DEFAULT_SITE_CONTENT.robot.subsystems);
	});

	it('accepts editable list rows and empty lists', () => {
		const content = parseSiteContent({
			stats: [{ value: '12', label: 'Builders' }],
			timeline: { rows: [{ month: 'May', event: 'Worlds', status: 'future' }] },
			team: { members: [] }
		});

		expect(content?.stats).toEqual([{ value: '12', label: 'Builders' }]);
		expect(content?.timeline.rows).toEqual([{ month: 'May', event: 'Worlds', status: 'future' }]);
		expect(content?.team.members).toEqual([]);
	});

	it('rejects oversized text, invalid marker positions, and oversized lists', () => {
		expect(parseSiteContent({ teamName: 'x'.repeat(2001) })).toBeNull();
		expect(parseSiteContent({ robot: { subsystems: [{ x: 101 }] } })).toBeNull();
		expect(parseSiteContent({ stats: Array.from({ length: 101 }, () => ({ value: '', label: '' })) })).toBeNull();
	});
});