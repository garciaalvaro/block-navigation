import { createContext } from "@wordpress/element";

import type { Context } from "./types";

export const initial: Context = {
	ancestors_id: [],
	drop_areas: [],
	id: "",
	parent_id: "",
};

export const context = createContext<Context>(initial);
