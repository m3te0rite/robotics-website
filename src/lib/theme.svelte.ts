export type Theme = 'light' | 'dark';

export const currentTheme = $state({ value: 'light' as Theme });

export function initializeTheme() {
	const stored = localStorage.getItem('robotics-site-theme');
	currentTheme.value = stored === 'dark' ? 'dark' : 'light';
	document.documentElement.dataset.theme = currentTheme.value;
}

export function toggleTheme() {
	currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
	document.documentElement.dataset.theme = currentTheme.value;
	localStorage.setItem('robotics-site-theme', currentTheme.value);
}