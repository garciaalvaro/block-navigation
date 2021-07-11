import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect, useMemo } from "@wordpress/element";

import type { UseSizeMax } from "./types";
import { useWindowSize } from "@/utils";
import { store_slug } from "@/store";

export const useSizeMax: UseSizeMax = () => {
	const { detachedCollapse, detachedSizeUpdate } = useDispatch(store_slug);
	const is_expanded = useSelect(select =>
		select(store_slug).detached_is_expanded()
	);
	const detached_size = useSelect(select =>
		select(store_slug).detached_size()
	);

	const { window_height, window_width, is_mobile } = useWindowSize();

	const detached_max_size = useMemo(
		() => ({
			width: window_width - 50,
			height: window_height - 100,
		}),
		[window_width, window_height]
	);

	useEffect(() => {
		if (is_mobile && is_expanded) {
			detachedCollapse();
		}

		if (
			detached_size.width > detached_max_size.width ||
			detached_size.height > detached_max_size.height
		) {
			const width = Math.min(
				detached_size.width,
				detached_max_size.width
			);

			const height = Math.min(
				detached_size.height,
				detached_max_size.height
			);

			detachedSizeUpdate({ width, height });
		}
	}, [window_height, window_width]);

	return detached_max_size;
};
