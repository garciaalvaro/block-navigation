type State = {
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
};

type Action<T, P = null> = {
	type: T;
	payload: P;
};

type ActionCreator<T, P = null> = {
	(payload?: P): Action<T, P>;
};

type Selector<T, P = null> = {
	(state: State, parameter: P): T;
};

type ActionCreators = import("store/actions").ActionCreators;

type Selectors = import("store/selectors").Selectors;
