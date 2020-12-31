interface State {
	view: "navigation" | "settings";
	moving_type: null | "by_click" | "by_drag";
	moving_block: null | {
		id: BlockId;
		parent_id: BlockId;
		index_local: number;
		index_global: number;
		level: number;
		name: string;
	};
	color_scheme: string;
	blocks_collapsed: BlockId[];
	is_detached: boolean;
	is_dev: boolean;
	detached_position: "left" | "right";
	detached_is_expanded: boolean;
	detached_size: { width: number; height: number };
}
