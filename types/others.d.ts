type Block = import("wordpress__blocks").BlockInstance;

type BlockType = import("wordpress__blocks").Block;

interface ComponentProps extends Object {
	children?: React.ReactNode;
	id?: string | null;
	className?: string | null | (string | null)[] | undefined;
}

interface MenuProps {
	id: string;
	closeMenu: Function;
	setMovingBlock: Function;
}

type BlockId = Block["clientId"];

interface DropArea {
	id: BlockId;
	level: number;
}

interface BlockDropArea {
	id: BlockId;
	drop_areas: DropArea[];
}
