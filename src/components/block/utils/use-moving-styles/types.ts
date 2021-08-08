interface Props {
	moving_is_over: boolean;
	is_moving: boolean;
	can_move: boolean;
}

export type Util = (props: Props) => {
	className_container: string;
	className_content: string;
};
