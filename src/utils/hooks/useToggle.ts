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
	const close = () => setOpen(false);
	const open = () => setOpen(true);
	const toggle = () => setOpen(is_open => !is_open);

	return { is_open, close, open, toggle };
};
