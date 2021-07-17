import type { State } from "../state";

type Selector<T extends keyof State, S = void> = S extends void
	? () => State[T]
	: (state: S) => State[T];

export interface Selectors<S = void> {
	block_info_displayed: Selector<"block_info_displayed", S>;
	color_scheme: Selector<"color_scheme", S>;
	detached_is_expanded: Selector<"detached_is_expanded", S>;
	detached_position: Selector<"detached_position", S>;
	detached_size: Selector<"detached_size", S>;
	moving_block: Selector<"moving_block", S>;
	moving_type: Selector<"moving_type", S>;
	ids_collapsed: Selector<"ids_collapsed", S>;
	ids: Selector<"ids", S>;
	ids_hidden: Selector<"ids_hidden", S>;
	is_detached: Selector<"is_detached", S>;
	is_dev: Selector<"is_dev", S>;
	is_expanded: S extends void
		? (id: BlockId) => boolean
		: (state: S, id: BlockId) => boolean;
	view: Selector<"view", S>;
}
