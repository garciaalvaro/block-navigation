import type { BlockId, DropArea } from "@/types";
import type { State } from "@/store";

interface Props {
	id: BlockId;
	ancestors_id: BlockId[];
	ids_visible: State["ids_visible"];
	moving_block: State["moving_block"];
}

export type Util = (props: Props) => DropArea[];
