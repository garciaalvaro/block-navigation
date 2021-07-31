import { useMemo, useState, useEffect } from "@wordpress/element";

import type { Util } from "./types";

export const useItemsStyles: Util = props => {
	const { item_height, number_of_items, $container, container_height } =
		props;

	const [boundaries, setBoundaries] = useState({ top: 0, bottom: 0 });

	useEffect(() => {
		const $container_ref = $container.current;

		const updateBoundaries = () => {
			const scroll_top = $container_ref?.scrollTop || 0;
			const offset = container_height / 2;
			const boundary_top = scroll_top - item_height - offset;
			const boundary_bottom = scroll_top + container_height + offset;

			setBoundaries({
				top: boundary_top,
				bottom: boundary_bottom,
			});
		};

		updateBoundaries();

		// TODO: debounce the scroll
		$container_ref?.addEventListener("scroll", updateBoundaries);

		return () =>
			$container_ref?.removeEventListener("scroll", updateBoundaries);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [container_height, item_height]);

	const items_styles = useMemo(
		() =>
			Array(number_of_items)
				.fill(null)
				.map((_, index) => ({ top: index * item_height })),
		[number_of_items, item_height]
	);

	const items_visible = useMemo(
		() =>
			Array(number_of_items)
				.fill(null)
				.map((_, index) => index)
				.filter((_, index) => {
					const item = items_styles[index];

					if (item === undefined) {
						return false;
					}

					const { top } = item;

					if (boundaries.top > top || boundaries.bottom <= top) {
						return false;
					}

					return true;
				}, []),
		[number_of_items, boundaries, items_styles]
	);

	return { items_styles, items_visible };
};
