import type { BlockId } from "@/types";
import type { State } from "@/store";

interface Props {
	children_index: number;
	id: BlockId;
	moving_block: State["moving_block"];
}

export type Util = (props: Props) => boolean;
