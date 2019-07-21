import { pr } from "utils/data/plugin";

const { compact, flow, isString } = lodash;

const resolvePrefix = (element: string, separator: string): string => {
	if (element.startsWith("!")) {
		return element.replace("!", "");
	}

	return pr + separator + element;
};

export const addPrefix = (
	elements: string | null | (string | null)[],
	separator: string = "-"
): string => {
	if (!elements) {
		return "";
	}

	if (isString(elements)) {
		return resolvePrefix(elements, separator);
	}

	return flow([
		compact,
		(elements: string[]) => elements.map(el => resolvePrefix(el, separator)),
		(elements: string[]) => elements.join(" ")
	])(elements);
};
