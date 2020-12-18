type Block = import("wordpress__blocks").BlockInstance;

type BlockType = import("wordpress__blocks").Block;

type BlockId = Block["clientId"];

interface ComponentProps {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[prop: string]: any;

	id?: string | null;
	className?: string | null | (string | null)[] | undefined;
	children?: import("react").ReactNode;
}

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
