import type { BlockId } from "@/types";

export type Util = (id: BlockId, ids: BlockId[]) => BlockId | null;
