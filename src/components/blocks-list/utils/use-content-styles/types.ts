export interface ContentStyle {
	height: number;
}

export type Util = (props: {
	item_height: number;
	number_of_items: number;
}) => ContentStyle;
