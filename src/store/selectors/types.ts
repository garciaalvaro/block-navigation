import type { BlockId } from "@/types";
import type { State } from "../state";

type Selector<R, P = void> = (payload: P) => R;
type SelectorCreator<R, P = void> = (state: State, payload: P) => R;

interface SelectorsReturn {
	block_info_displayed: State["block_info_displayed"];
	color_scheme: State["color_scheme"];
	detached_is_expanded: State["detached_is_expanded"];
	detached_position: State["detached_position"];
	detached_size: State["detached_size"];
	moving_block: State["moving_block"];
	moving_type: State["moving_type"];
	ids_collapsed: State["ids_collapsed"];
	ids: State["ids"];
	ids_hidden: State["ids_hidden"];
	ids_visible: BlockId[];
	is_detached: State["is_detached"];
	is_dev: State["is_dev"];
	is_expanded: boolean;
	view: State["view"];
}

interface SelectorsPayload {
	is_expanded: BlockId;
}

type SelectorsWithoutPayload = {
	[K in keyof Omit<SelectorsReturn, keyof SelectorsPayload>]: Selector<
		SelectorsReturn[K]
	>;
};

type SelectorsWithPayload = {
	[K in keyof SelectorsPayload]: Selector<
		SelectorsReturn[K],
		SelectorsPayload[K]
	>;
};

type SelectorCreatorsWithoutPayload = {
	[K in keyof Omit<SelectorsReturn, keyof SelectorsPayload>]: SelectorCreator<
		SelectorsReturn[K]
	>;
};

type SelectorCreatorsWithPayload = {
	[K in keyof SelectorsPayload]: SelectorCreator<
		SelectorsReturn[K],
		SelectorsPayload[K]
	>;
};

export type Selectors = SelectorsWithoutPayload & SelectorsWithPayload;

export type SelectorCreators = SelectorCreatorsWithoutPayload &
	SelectorCreatorsWithPayload;
