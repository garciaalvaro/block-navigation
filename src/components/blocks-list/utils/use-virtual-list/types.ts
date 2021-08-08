import type { RefObject } from "react";

import type { ContentStyle } from "../use-content-styles";
import type { ItemStyle } from "../use-items-styles";

export type Util = (props: {
	item_ids: string[];
	item_height: number;
	number_of_items: number;
}) => {
	$container: RefObject<HTMLDivElement>;
	container_className: string;
	content_styles: ContentStyle;
	items_styles: ItemStyle[];
};
