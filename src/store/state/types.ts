type BlockId = string;

export interface State {
	view: "navigation" | "settings";

	moving_block: null | {
		id: BlockId;
		name: string;
		parent_id: BlockId;
	};
	moving_type: null | "by_click" | "by_drag";

	color_scheme: string;
	is_detached: boolean;
	is_dev: boolean;
	block_info_displayed: "title_content" | "title" | "content";

	ids_visible: null | BlockId[];
	ids_collapsed: BlockId[];

	detached_position: "left" | "right";
	detached_is_expanded: boolean;
	detached_size: { width: number; height: number };
}
