// Console log shortcut
declare const l: Function;

// Lodash
declare const lodash: typeof import("lodash");

// Wordpress
declare const wp: {
	blockEditor: typeof import("wordpress__block-editor");
	blocks: typeof import("wordpress__blocks");
	components: typeof import("wordpress__components");
	compose: typeof import("wordpress__compose") & {
		withState<SP extends object, P = {}>(
			initialState: { [k in keyof SP]: SP[k] }
		): (component: React.ComponentType<SP & P>) => React.ComponentType<P>;
		// ) => T extends React.ComponentType<infer U>
		// 	? ComponentClass<Omit<U, keyof SP | "setState">, SP>
		// 	: never;
		withGlobalEvents<P = {}>(
			eventMapper: { [k in keyof WindowEventMap]?: string }
		): <T extends ComponentClass<P>>(
			component: T
		) => T extends ComponentClass<infer U> ? React.ComponentType<U> : never;
	};
	data: typeof import("wordpress__data");
	domReady: typeof import("wordpress__dom-ready");
	editPost: typeof import("wordpress__edit-post");
	element: typeof import("wordpress__element");
	hooks: typeof import("wordpress__hooks");
	htmlEntities: typeof import("wordpress__html-entities");
	i18n: typeof import("wordpress__i18n");
	plugins: typeof import("wordpress__plugins");
	richText: typeof import("wordpress__rich-text");
};

// https://stackoverflow.com/a/49286056 | CC BY-SA 3.0
type ValueOf<T> = T[keyof T];

type Block = import("wordpress__blocks").BlockInstance;

type BlockType = import("wordpress__blocks").Block;

interface Object {
	[key: string]: any;
}

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

type Action<T, P = null> = {
	type: T;
	payload?: P;
};

type ActionCreator<T, P = null> = (payload?: P) => Action<T, P>;

type Selector<T, P = null> = (state: State, parameter: P) => T;

interface ActionCreators {
	resetMoving: ActionCreator<"RESET_MOVING">;
	setMovingBlock: ActionCreator<"SET_MOVING_BLOCK", State["moving_block"]>;
	setMovingType: ActionCreator<"SET_MOVING_TYPE", State["moving_type"]>;
	setView: ActionCreator<"SET_VIEW", State["view"]>;
	setColorScheme: ActionCreator<"SET_COLOR_SCHEME", State["color_scheme"]>;
}

interface Selectors {
	getView: Selector<State["view"]>;
	getMovingBlock: Selector<State["moving_block"]>;
	getMovingType: Selector<State["moving_type"]>;
	getColorScheme: Selector<State["color_scheme"]>;
	isMoving: Selector<boolean>;
}

interface MenuProps {
	id: string;
	parent_id: string;
	template_lock: string;
	block: Block;
	block_type: BlockType | null | undefined;
	can_move: boolean;
	index: number;
	close: Function;
	close_children: Function;
}

interface SetStateProp {
	setState(obj: any): void;
}

interface BlockProps {
	id: string;
	parent_id: string;
	level: number;
	index: number;
	template_lock: string;
	can_receive_drop: boolean;
	moving: boolean;
	is_selected: boolean;
	is_open: boolean;
	is_last_children: boolean;
	block: Block | null;
	block_type: BlockType | undefined | null;
}

// type Id = string;
// type ParentId = string;
// type TemplateLock = string;
// type CanReceiveDrop = boolean;
// type Moving = boolean;
// type IsSelected = boolean;
// type IsLastChildren = boolean;
// type IsOpen = boolean;
