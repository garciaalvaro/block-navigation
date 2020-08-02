import { useState } from "@wordpress/element";

export const useToggle = (
	initial_open = false
): {
	is_open: boolean;
	close: () => void;
	open: () => void;
	toggle: () => void;
} => {
	const [is_open, setOpen] = useState(initial_open);

	return {
		is_open,
		close: () => setOpen(false),
		open: () => setOpen(true),
		toggle: () => setOpen(is_open => !is_open),
	};
};
