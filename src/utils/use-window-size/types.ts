export type UseWindowSize = (time?: number) => {
	window_width: number;
	window_height: number;
	is_mobile: boolean;
};
