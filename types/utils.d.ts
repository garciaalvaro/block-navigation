interface Object {
	[key: string]: any;
}

// https://stackoverflow.com/a/49286056 | CC BY-SA 3.0
type ValueOf<T> = T[keyof T];

type SetStateProp = { setState(obj: any): void };

type Block = import("wordpress__blocks").BlockInstance;

type BlockType = import("wordpress__blocks").Block;

type MenuProps = {
	id: string;
	parent_id: string;
	template_lock: string;
	block: Block;
	block_type: BlockType | null | undefined;
	can_move: boolean;
	index: number;
	close: Function;
	close_children: Function;
};
