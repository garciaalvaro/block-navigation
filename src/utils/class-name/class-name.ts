import type { Util } from "./types";

export const className: Util = (...classNames) => {
	return classNames
		.reduce<string[]>((acc, _className) => {
			let className = _className;

			if (typeof className === "object" && className !== null) {
				const classNameObj = className;

				className = Object.keys(className).reduce((acc, key) => {
					if (!classNameObj[key]) {
						return acc;
					}

					if (!acc) {
						return key;
					}

					return `${acc} ${key}`;
				}, "");
			}

			if (!className) {
				return acc;
			}

			return [...acc, className];
		}, [])
		.join(" ");
};
