import type { RefObject } from "react";

export type ItemStyle =
	| {
			top: number;
	  }
	| undefined;

export interface ContentStyle {
	height: number;
}

export type Util = (props: {
	item_height: number;
	items_index_to_keep_rendered?: number[];
	items_length: number;
}) => {
	$container: RefObject<HTMLDivElement>;
	container_className: string;
	content_className: string;
	content_style: ContentStyle;
	items_style: ItemStyle[];
};
