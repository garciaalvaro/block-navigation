import type { RefObject } from "react";

export type ItemStyle = { top: number };

export type Util = (props: {
	$container: RefObject<HTMLDivElement>;
	container_height: number;
	item_height: number;
	number_of_items: number;
}) => {
	items_styles: ItemStyle[];
	items_visible: number[];
};
