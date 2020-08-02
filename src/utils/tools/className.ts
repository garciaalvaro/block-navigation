export const className = (
	classNames: (string | null | undefined)[] | Record<string, boolean>
): string => {
	if (Array.isArray(classNames)) {
		return classNames.filter(className => className).join(" ");
	}

	return Object.keys(classNames).reduce((acc, key) => {
		if (!classNames[key]) {
			return acc;
		}

		return `${acc} ${key}`;
	}, "");
};
