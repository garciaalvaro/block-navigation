type Block = import("wordpress__blocks").BlockInstance;

type BlockId = Block["clientId"];

interface DropArea {
	id: BlockId;
	level: number;
}

type ValueOf<T> = T[keyof T];

// CSS modules
declare module "*.styl" {
	const styles: { [className: string]: string };
	export default styles;
}

type Icon =
	| "detach"
	| "close"
	| "remove"
	| "copy"
	| "log"
	| "edit"
	| "collapse"
	| "expand"
	| "menu"
	| "move";

interface BlockContent {
	type: "text" | "image";
	path: string[];
}

type BlocksContent = Record<string, BlockContent>;
