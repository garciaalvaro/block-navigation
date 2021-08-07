import { useMemo, useState, useLayoutEffect } from "@wordpress/element";

import type { Util } from "./types";

export const useItemsStyles: Util = props => {
	const { $container, container_height, item_height, item_ids } = props;

	const [boundaries, setBoundaries] = useState({ top: 0, bottom: 0 });

	useLayoutEffect(() => {
		const $container_ref = $container.current;

		const updateBoundaries = () => {
			const scroll_top = $container_ref?.scrollTop || 0;
			const offset = container_height / 2;
			const boundary_top = scroll_top - item_height - offset;
			const boundary_bottom = scroll_top + container_height + offset;

			setBoundaries({
				top: Math.max(0, boundary_top),
				bottom: Math.max(container_height, boundary_bottom),
			});
		};

		updateBoundaries();

		// TODO: debounce the scroll
		$container_ref?.addEventListener("scroll", updateBoundaries);

		return () =>
			$container_ref?.removeEventListener("scroll", updateBoundaries);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [container_height, item_height]);

	const items_styles = useMemo(() => {
		const content_height = item_ids.length * item_height;

		const top_percentage =
			boundaries.top > 0 ? boundaries.top / content_height : 0;
		const top_index = Math.floor(top_percentage * item_ids.length);

		const bottom_percentage = boundaries.bottom / content_height;
		const bottom_index = Math.ceil(bottom_percentage * item_ids.length);

		const styles = item_ids
			.slice(top_index, bottom_index)
			.map((id, index) => ({
				id,
				top: item_height * (top_index + index),
			}));

		return styles;
	}, [item_ids, item_height, boundaries]);

	return items_styles;
};
