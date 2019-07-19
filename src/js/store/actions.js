import l from "utils";

const actions = {
	toggleDevMode() {
		return {
			type: "TOGGLE_DEV_MODE"
		};
	},
	triggerSelectBlock(trigger) {
		return {
			type: "TRIGGER_SELECTBLOCK",
			trigger
		};
	},
	toggleMenu(client_id) {
		return {
			type: "TOGGLE_MENU",
			client_id
		};
	},
	updateMouseOverBlock(client_id, is_end_of_list) {
		return {
			type: "UPDATE_MOUSE_OVER_BLOCK",
			client_id,
			is_end_of_list
		};
	},
	updateMovingBlock(
		move_type,
		client_id,
		parent_client_id,
		template_lock,
		name,
		index
	) {
		return {
			type: "UPDATE_MOVING_BLOCK",
			move_type,
			client_id,
			parent_client_id,
			template_lock,
			name,
			index
		};
	},
	removeMovingBlock() {
		return {
			type: "REMOVE_MOVING_BLOCK"
		};
	},
	collapseBlock(parent_client_id) {
		return {
			type: "COLLAPSE_BLOCK",
			parent_client_id
		};
	},
	expandBlock(parent_client_id) {
		return {
			type: "EXPAND_BLOCK",
			parent_client_id
		};
	},
	updateColorScheme(color_scheme) {
		return {
			type: "UPDATE_COLOR_SCHEME",
			color_scheme
		};
	},
	toggleDropGuides() {
		return {
			type: "TOGGLE_DROP_GUIDES"
		};
	}
};

export default actions;
