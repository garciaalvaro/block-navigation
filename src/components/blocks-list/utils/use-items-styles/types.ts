import type { RefObject } from "react";

import type { BlockId } from "@/types";

export type ItemStyle = { id: BlockId; top: number };

export type Util = (props: {
	$container: RefObject<HTMLDivElement>;
	container_height: number;
	item_height: number;
	item_ids: string[];
}) => ItemStyle[];
