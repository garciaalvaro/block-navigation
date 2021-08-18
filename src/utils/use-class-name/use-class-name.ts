import { useMemo } from "@wordpress/element";

import { className as classNameUtil } from "@/utils";

import type { Util } from "./types";

export const useClassName: Util = (dependencies, ..._className) => {
	const className = useMemo(
		() => classNameUtil(..._className),
		// TODO
		// eslint-disable-next-line react-hooks/exhaustive-deps
		dependencies
	);

	return className;
};
