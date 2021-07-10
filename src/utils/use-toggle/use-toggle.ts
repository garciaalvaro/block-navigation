import { useState } from "@wordpress/element";

import type { UseToggle } from "./types";

export const useToggle: UseToggle = (initial_open = false) => {
	const [is_open, setOpen] = useState(initial_open);

	return {
		is_open,
		close: () => setOpen(false),
		open: () => setOpen(true),
		toggle: () => setOpen(is_open => !is_open),
	};
};
