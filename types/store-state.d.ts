interface State {
	view: "navigation" | "settings";
	moving_type: "by_click" | "by_drag";
	moving_block: {
		id: string;
		parent_id: string;
		template_lock: string | undefined;
		block_name: string;
		index: number;
		was_expanded: boolean;
	};
	color_scheme: string;
	collapsed_blocks: BlockProps["id"][];
}
