import React from "react";
import { useMemo } from "@wordpress/element";

import { getAncestorsId } from "@/utils";

import type { Component } from "./types";
import { context } from "./context";
import { useDropAreas } from "./utils";

export const ContextProvider: Component = props => {
	const { children, id } = props;

	const ancestors_id = useMemo(() => getAncestorsId(id), [id]);

	const parent_id = useMemo(
		() => ancestors_id.slice(-1)[0] || "",
		[ancestors_id]
	);

	const drop_areas = useDropAreas({ id, parent_id, ancestors_id });

	return (
		<context.Provider
			value={{
				ancestors_id,
				drop_areas,
				id,
				parent_id,
			}}
		>
			{children}
		</context.Provider>
	);
};
