// Console log shortcut
declare const l: Function;

// Lodash
declare const lodash: typeof import("lodash");

// Wordpress
declare const wp: {
	blockEditor: Object;
	blocks: typeof import("wordpress__blocks");
	components: typeof import("wordpress__components");
	compose: typeof import("wordpress__compose");
	data: typeof import("wordpress__data");
	domReady: Function;
	editPost: Object;
	element: typeof import("wordpress__element");
	hooks: typeof import("wordpress__hooks");
	htmlEntities: typeof import("wordpress__html-entities");
	i18n: typeof import("wordpress__i18n");
	plugins: typeof import("wordpress__plugins");
};
