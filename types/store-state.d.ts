interface State {
	view: "navigation" | "settings";
	moving_type: "by_click" | "by_drag";
	moving_block: {
		id: string;
		parent_id: string;
		template_lock: string | undefined;
		block_name: string;
		index: number;
	};
	color_scheme: string;
}
