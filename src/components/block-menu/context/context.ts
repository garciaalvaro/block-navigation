import { createContext } from "@wordpress/element";

import type { Context } from "./types";

export const initial: Context = {
	menu_is_open: false,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	toggleMenu: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	closeMenu: () => {},
};

export const context = createContext<Context>(initial);
