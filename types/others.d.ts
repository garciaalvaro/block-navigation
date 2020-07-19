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

interface MenuProps {
	id: string;
	closeMenu: () => void;
	setMovingBlock: () => void;
}

type DropArea = {
	id: BlockId;
	level: number;
};

type valueof<T> = T[keyof T];
