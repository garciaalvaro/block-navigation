import { useMemo } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import styles from "./styles.styl";
import type { UseColor } from "./types";
import { store_slug } from "@/store";

export const useColor: UseColor = () => {
	const [color_type, color_name] = useSelect(select =>
		select(store_slug).color_scheme().split("-")
	);

	const className = useMemo(
		() => [styles[color_type], styles[color_name]],
		[color_type, color_name]
	);

	return className;
};
