import type { BlockId, DropArea } from "@/types";
import type { State } from "@/store";

interface Props {
	id: BlockId;
	parent_id: BlockId;
	ancestor_ids: BlockId[];
	ids_visible: State["ids_visible"];
	moving_block: State["moving_block"];
}

export type Util = (props: Props) => DropArea[];
