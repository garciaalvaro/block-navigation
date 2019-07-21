declare type State = {
	tab_open: "navigation" | "settings";
	is_moving: boolean;
	moving_type: "by_click" | "by_drag";
	moving_block: {
		id: string;
		parent_id: string;
		template_lock: string;
		block_name: string;
	};
	color_scheme: import("utils/data/color_schemes").ColorScheme;

	// drop_above: string;
	// //
	// settings: {
	// 	dd_guides: boolean;
	// 	color_scheme: ColorScheme;
	// 	moving_type: MoveType;
	// 	show_guides: boolean;
	// };

	// selectBlock_triggered: boolean;
	// collapsed_parent_blocks: ClientId[];
	// menu_open_block: {
	// 	client_id: ClientId;
	// };
	// mouse_over_block: {
	// 	client_id: ClientId;
	// 	is_end_of_list: boolean;
	// };
	// moving_block: {
	// 	move_type: MoveType;
	// 	client_id: ClientId;
	// 	parent_client_id: ClientId;
	// 	template_lock: boolean;
	// 	name: string;
	// 	index: number;
	// 	was_expanded: boolean;
	// };
};

declare type Action<T, P = null> = {
	type: T;
	payload: P;
};

declare type ActionCreator<T, P = null> = {
	(payload?: P): Action<T, P>;
};

declare type Selector<T, P = null> = {
	(state: State, parameter: P): T;
};

declare type ActionCreators = import("store/actions").ActionCreators;

declare type Selectors = import("store/selectors").Selectors;
