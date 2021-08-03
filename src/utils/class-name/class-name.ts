import type { Util } from "./types";

export const className: Util = (...values) => {
	return values
		.reduce<string[]>((acc, _className) => {
			if (typeof _className === "object" && _className !== null) {
				const classNameObj = _className;

				// TODO
				// eslint-disable-next-line no-param-reassign
				_className = Object.keys(_className).reduce((_acc, key) => {
					if (!classNameObj[key]) {
						return _acc;
					}

					if (!_acc) {
						return key;
					}

					return `${_acc} ${key}`;
				}, "");
			}

			if (!_className) {
				return acc;
			}

			return [...acc, _className];
		}, [])
		.join(" ");
};
