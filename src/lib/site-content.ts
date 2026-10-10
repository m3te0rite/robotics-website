export interface SiteContent {
	teamName: string;
	teamNumber: string;
	location: string;
	league: string;
	heroTitle: string;
	heroSecondLine: string;
	heroSubtitle: string;
	heroBuildLabel: string;
	heroSeasonLabel: string;
	teamLogoUrl: string;
	heroBackgroundUrl: string;
	aboutTitle: string;
	aboutDescription: string;
	stats: { value: string; label: string }[];
	navigation: {
		about: string;
		robot: string;
		timeline: string;
		outreach: string;
		team: string;
		results: string;
		sponsors: string;
		contact: string;
	};
	robot: {
		title: string;
		kicker: string;
		imageUrl: string;
		imageAlt: string;
		subsystemsLabel: string;
		specsTitle: string;
		softwareTitle: string;
		hardwareTitle: string;
		strategyTitle: string;
		subsystems: { label: string; description: string; x: number; y: number }[];
		specs: { label: string; value: string }[];
		softwareIntro: string;
		software: { label: string; value: string }[];
		hardwareDescription: string;
		hardwareTag: string;
		strategyDescription: string;
		strategyTag: string;
	};
	timeline: {
		title: string;
		kicker: string;
		monthHeader: string;
		eventHeader: string;
		statusHeader: string;
		activeLabel: string;
		futureLabel: string;
		doneLabel: string;
		rows: { month: string; event: string; status: 'active' | 'future' | 'done' }[];
	};
	outreach: {
		title: string;
		items: { title: string; description: string; tag: string }[];
	};
	team: {
		title: string;
		kicker: string;
		members: { name: string; role: string; photoUrl: string }[];
	};
	results: {
		title: string;
		kicker: string;
		awardLabel: string;
		awardTitle: string;
		awardDescription: string;
		cards: { label: string; title: string; description: string }[];
	};
	sponsors: {
		title: string;
		kicker: string;
		introduction: string;
		mentorshipTitle: string;
		mentorshipDescription: string;
		facilityTitle: string;
		facilityDescription: string;
		contactPrompt: string;
		tierHeader: string;
		investmentHeader: string;
		inclusionsHeader: string;
		tiers: { name: string; amount: string; perks: string[] }[];
	};
	contactTitle: string;
	contactDescription: string;
	contactEmail: string;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
	teamName: 'Team Name',
	teamNumber: '00000',
	location: 'Your City, State',
	league: 'Your League',
	heroTitle: 'Engineering',
	heroSecondLine: 'in Motion.',
	heroSubtitle: 'A FIRST Tech Challenge robotics team building, learning, and competing together.',
	heroBuildLabel: 'The Build',
	heroSeasonLabel: 'Season',
	teamLogoUrl: '/favicon.png',
	heroBackgroundUrl: '/og.png',
	aboutTitle: 'About Us',
	aboutDescription:
		'We are a student-led robotics team passionate about engineering, designing, and innovating. Our mission is to build a strong engineering community and inspire the next generation of creators.',
	stats: [
		{ value: '15', label: 'Members' },
		{ value: '7', label: 'Seasons' },
		{ value: '2', label: 'Regionals' },
		{ value: '2019', label: 'Founded' }
	],
	navigation: {
		about: 'About',
		robot: 'Robot',
		timeline: 'Timeline',
		outreach: 'Outreach',
		team: 'Roster',
		results: 'Results',
		sponsors: 'Sponsors',
		contact: 'Contact'
	},
	robot: {
		title: 'The Robot',
		kicker: 'Java · Onshape · PedroPathing',
		imageUrl: '/robot.png',
		imageAlt: 'FTC competition robot',
		subsystemsLabel: 'Subsystems',
		specsTitle: 'Robot Specs',
		softwareTitle: 'Software',
		hardwareTitle: 'Hardware',
		strategyTitle: 'Strategy',
		subsystems: [
			{
				label: 'Launcher',
				x: 40,
				y: 22,
				description:
					'Dual-stage flywheel on a printed truss frame. Fixed hood angle, velocity held under PIDF so shot distance stays repeatable across a match.'
			},
			{
				label: 'Intake',
				x: 78,
				y: 48,
				description:
					'Compliant star-wheel rollers on a sprung axle. Sweeps game elements off the floor at full drive speed and centers them for transfer.'
			},
			{
				label: 'Transfer Linkage',
				x: 56,
				y: 66,
				description:
					'Four-bar linkage that hands off from the intake to the launcher. Single motion, no stall points, keeps the path short and jam-free.'
			},
			{
				label: 'Chassis',
				x: 40,
				y: 74,
				description:
					'Welded-profile frame with a low, centered mass. Bolt-on plate panels let a damaged section swap out between matches in under two minutes.'
			},
			{
				label: 'Mecanum Drive',
				x: 13,
				y: 73,
				description:
					'Four mecanum wheels for holonomic motion, paired with dead-wheel odometry pods feeding the localizer.'
			}
		],
		specs: [
			{ label: 'Auto score (avg)', value: '# pts' },
			{ label: 'Cycle time', value: '# sec' },
			{ label: 'Autonomous runs', value: '#+' },
			{ label: 'Season W/L/T', value: 'a-b-c' },
			{ label: 'Drivetrain', value: 'Mecanum' },
			{ label: 'Weight', value: '# lbs' }
		],
		softwareIntro: 'FTC SDK Java, PedroPathing Ivy over dead-wheel odometry.',
		software: [
			{ label: 'Control', value: 'FTC SDK · Java' },
			{ label: 'Autonomy', value: 'PedroPathing' },
			{ label: 'Localization', value: 'MCL + odometry' },
			{ label: 'Tuning', value: 'PIDF / feedforward' },
			{ label: 'Vision', value: 'AprilTag pose solve' },
			{ label: 'Tooling', value: 'FTC Dashboard' }
		],
		hardwareDescription: 'Onshape for CAD, GoBUILDA parts.',
		hardwareTag: 'CAD / Build',
		strategyDescription: "Scoring app + match analysis. We've improved x points because of it.",
		strategyTag: 'Analysis / Scouting'
	},
	timeline: {
		title: 'Season Timeline.',
		kicker: '2025–26',
		monthHeader: 'Mo.',
		eventHeader: 'Notes',
		statusHeader: 'Stat',
		activeLabel: 'LIVE',
		futureLabel: 'FUTURE',
		doneLabel: 'DONE',
		rows: [
			{
				month: 'Sep',
				event: 'Kickoff: game reveal, brainstorm, first prototypes',
				status: 'active'
			},
			{
				month: 'Oct',
				event: 'Build season: robot development, CADs for main systems',
				status: 'future'
			},
			{
				month: 'Nov-Dec',
				event: 'League Meets: iterate on autonomous and driver performance',
				status: 'future'
			},
			{
				month: 'Jan',
				event: 'Final refinements: either redesign or refine current',
				status: 'future'
			},
			{ month: 'Feb', event: 'League Championship', status: 'future' }
		]
	},
	outreach: {
		title: 'Beyond Competition.',
		items: [
			{
				title: 'FLL Mentoring',
				description:
					'Mentoring local FIRST Lego League teams, helping younger students build their first robots and prepare for competition.',
				tag: 'ongoing'
			},
			{
				title: 'Demonstrations',
				description:
					'Visiting elementary and middle schools to show off our robot and get kids excited about STEM.',
				tag: 'quarterly'
			},
			{
				title: 'Open Shop',
				description:
					'Sharing our resources, code, and designs with rookie teams to help grow the FIRST community.',
				tag: 'always'
			}
		]
	},
	team: {
		title: 'The Team.',
		kicker: '15 members',
		members: [
			{ name: 'Arnav Saraf', role: 'Captain', photoUrl: 'favicon.png' },
			{ name: 'Jayan Patel', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Owen Cassidy', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Vibha Pulluru', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Reeyansh Hande', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'James Harker', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Aiden Chrisman', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Bhaskara Bosuru', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'David Hernan', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Rohan Dash', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Ethan Li', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Ethan Wu', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Madhuvan Kanike', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Tanvi Chakka', role: 'Member', photoUrl: 'favicon.png' },
			{ name: 'Po Lun Ting', role: 'Member', photoUrl: 'favicon.png' }
		]
	},
	results: {
		title: 'Season Results.',
		kicker: 'PAST SEASONS',
		awardLabel: 'Control Award',
		awardTitle: 'Second place — League Championship',
		awardDescription:
			'Recognized for our engineering notebook and software architecture, specifically our reliable autonomous control.',
		cards: [
			{
				label: 'Alliance',
				title: 'Finalist alliance captain',
				description:
					'Finals at the FiT Central GEMS League Championship, winning against top-ranked teams.'
			},
			{
				label: 'Legacy',
				title: 'Seven seasons',
				description:
					'Founded in 2019. Qualifying for League Tournament every season; two trips to Regionals.'
			}
		]
	},
	sponsors: {
		title: 'Sponsor Us.',
		kicker: 'Support the team',
		introduction:
			'Your support can fund robot parts, competition fees, and outreach events that bring STEM to the community.',
		mentorshipTitle: 'Mentorship',
		mentorshipDescription:
			'Opportunities to teach us robotics, project management, or real-world engineering skills are always welcome.',
		facilityTitle: 'Facility Tours',
		facilityDescription:
			'Showing us a real workspace, whatever your industry, is invaluable to a team of high schoolers building real things.',
		contactPrompt: 'Ask us about sponsorship and donation options.',
		tierHeader: 'Tier',
		investmentHeader: 'Investment',
		inclusionsHeader: 'Inclusions',
		tiers: [
			{
				name: 'Gold',
				amount: '$500+',
				perks: ['Logo on robot, team shirt & website', 'Name in notebook']
			},
			{
				name: 'Silver',
				amount: '$250–499',
				perks: ['Logo on team shirt & website', 'Named in notebook']
			},
			{ name: 'Bronze', amount: '$100–249', perks: ['Logo on website', 'Name in notebook'] },
			{ name: 'Community', amount: 'Any', perks: ['Name in notebook', 'Our thanks'] }
		]
	},
	contactTitle: 'Get in Touch.',
	contactDescription:
		"Interested in sponsoring, mentoring, or requesting a demonstration? Reach out and we'll get back to you.",
	contactEmail: 'team@example.com'
};

export function parseSiteContent(value: unknown): SiteContent | null {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
	return mergeKnownValues(DEFAULT_SITE_CONTENT, value) as SiteContent | null;
}

function mergeKnownValues(defaultValue: unknown, candidate: unknown): unknown | null {
	if (candidate === undefined) return structuredClone(defaultValue);
	if (typeof defaultValue === 'string') {
		if (typeof candidate !== 'string' || candidate.length > 2000) return null;
		return candidate;
	}
	if (typeof defaultValue === 'number') {
		if (
			typeof candidate !== 'number' ||
			!Number.isFinite(candidate) ||
			candidate < 0 ||
			candidate > 100
		)
			return null;
		return candidate;
	}
	if (Array.isArray(defaultValue)) {
		if (!Array.isArray(candidate) || candidate.length > 100) return null;
		const template = defaultValue[0];
		const entries = candidate.map((entry) => mergeKnownValues(template, entry));
		return entries.some((entry) => entry === null) ? null : entries;
	}
	if (defaultValue && typeof defaultValue === 'object') {
		if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return null;
		const result: Record<string, unknown> = {};
		for (const [key, childDefault] of Object.entries(defaultValue)) {
			const child = mergeKnownValues(childDefault, (candidate as Record<string, unknown>)[key]);
			if (child === null) return null;
			result[key] = child;
		}
		return result;
	}
	return null;
}
