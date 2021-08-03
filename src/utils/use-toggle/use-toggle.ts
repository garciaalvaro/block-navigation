import { useState } from "@wordpress/element";

import type { Util } from "./types";

export const useToggle: Util = (initial_open = false) => {
	const [is_open, setOpen] = useState(initial_open);

	return {
		is_open,
		close: () => setOpen(false),
		open: () => setOpen(true),
		toggle: () => setOpen(_is_open => !_is_open),
	};
};
