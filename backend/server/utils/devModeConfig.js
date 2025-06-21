// /backend/utils/devModeConfig.js
export let devMode = true;

const modes = {
	dev: {
		userNameMinimum: 1,
		passwordMinimum: 1,
		phoneMinimum: 1,
	},
	live: {
		userNameMinimum: 6,
		passwordMinimum: 8,
		phoneMinimum: 10,
	},
};

const activeMode = devMode ? modes.dev : modes.live;

export const userNameMinimum = activeMode.userNameMinimum;
export const passwordMinimum = activeMode.passwordMinimum;
export const phoneMinimum = activeMode.phoneMinimum;
