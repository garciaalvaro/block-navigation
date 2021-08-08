export type Util = () => {
	moving_is_over: boolean;
	is_moving: boolean;
	can_move: boolean;
	draggable: boolean;
	onDragStart: () => void;
	onDragEnd: () => void;
	onDragEnter: () => void;
	onDragLeave: () => void;
};
