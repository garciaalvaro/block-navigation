type Block = import("wordpress__blocks").BlockInstance;

type BlockType = import("wordpress__blocks").Block;

interface ComponentProps extends Object {
	children?: React.ReactNode;
	id?: string | null;
	className?: string | null | (string | null)[] | undefined;
}

interface MenuProps {
	id: string;
	parent_id: string;
	template_lock: string;
	block: Block;
	block_type: BlockType | null | undefined;
	can_move: boolean;
	index: number;
	close: Function;
	collapseBlock: Function;
	is_expanded: boolean;
}

interface BlockProps {
	id: string;
	parent_id: string;
	level: number;
	index: number;
	template_lock: string;
	can_receive_drop: boolean;
	moving: boolean;
	is_selected: boolean;
	is_expanded: boolean;
	is_last_children: boolean;
	block: Block | null;
	block_type: BlockType | undefined | null;
}
