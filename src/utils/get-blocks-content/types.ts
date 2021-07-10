export interface BlockContent {
	type: "text" | "image";
	path: string[];
}

export type BlocksContent = Record<string, BlockContent>;

export type RegisterFilters = () => BlocksContent;
