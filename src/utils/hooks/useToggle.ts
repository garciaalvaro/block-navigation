const { useState, useCallback } = wp.element;

export const useToggle = (initial_open = false) => {
	const [is_open, setOpen] = useState(initial_open);
	const close = useCallback(() => setOpen(false), []);
	const open = useCallback(() => setOpen(true), []);
	const toggle = useCallback(() => setOpen(is_open => !is_open), []);

	return { is_open, close, open, toggle };
};
