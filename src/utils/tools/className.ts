export const className = (classNames: (string | null)[]): string =>
	classNames.filter(className => className).join(" ");
