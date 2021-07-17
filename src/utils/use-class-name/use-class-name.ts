import { useMemo } from "@wordpress/element";

import { className as classNameUtil } from "@/utils";
import type { Util } from "./types";

export const useClassName: Util = (..._className) => {
	const className = useMemo(() => classNameUtil(..._className), _className);

	return className;
};
