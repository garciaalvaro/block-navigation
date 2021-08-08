import type { BlockId } from "@/types";
import type { State } from "@/store";

export type Util = (
	id: BlockId,
	moving_block: State["moving_block"]
) => boolean;
