import { useMemo } from "@wordpress/element";

import { className as classNameUtil } from "@/utils";
import type { UseClassName } from "./types";

export const useClassName: UseClassName = (..._className) => {
	const className = useMemo(() => classNameUtil(..._className), _className);

	return className;
};
