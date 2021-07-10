import type { RefObject } from "react";

export type ItemStyle = {
	top: number;
} | null;

export interface ContentStyle {
	height: number;
}

export type UseVirtualList = (props: {
	item_height: number;
	items_index_to_keep_rendered?: number[];
	items_length: number;
}) => {
	$container: RefObject<HTMLElement>;
	container_className: string;
	content_className: string;
	content_style: ContentStyle;
	items_style: ItemStyle[];
};
