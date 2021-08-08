import { useMemo } from "@wordpress/element";

import type { Util, ContentStyle } from "./types";

export const useContentStyles: Util = props => {
	const { item_height, number_of_items } = props;

	const content_styles = useMemo<ContentStyle>(() => {
		// Show extra empty space
		const offset = 2 * item_height;
		const height = item_height * number_of_items + offset;

		return { height };
	}, [item_height, number_of_items]);

	return content_styles;
};
