import { createContext } from "@wordpress/element";

import type { Context } from "./types";

export const initial: Context = {
	ancestor_ids: [],
	drop_areas: [],
	id: "",
	parent_id: "",
};

export const context = createContext<Context>(initial);
