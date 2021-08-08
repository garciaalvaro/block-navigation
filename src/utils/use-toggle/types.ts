export type Util = (initial_open: boolean) => {
	is_open: boolean;
	close: () => void;
	open: () => void;
	toggle: () => void;
};
