import l from "utils";

const initial_state = {
	dev_mode_active: false,
	drop_guides: true,
	selectBlock_triggered: false,
	color_scheme: "light-pistacho",
	collapsed_parent_blocks: [],
	menu_open_block: {
		client_id: false
	},
	mouse_over_block: {
		client_id: false,
		is_end_of_list: false
	},
	moving_block: {
		move_type: false,
		client_id: false,
		parent_client_id: false,
		template_lock: false,
		name: false,
		index: false,
		was_expanded: false
	}
};

export default initial_state;
