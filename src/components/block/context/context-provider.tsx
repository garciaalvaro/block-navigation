import React from "react";
import { useMemo } from "@wordpress/element";

import { getAncestorIds } from "@/utils";

import type { Component } from "./types";
import { context } from "./context";
import { useDropAreas } from "./utils";

export const ContextProvider: Component = props => {
	const { children, id } = props;

	const ancestor_ids = useMemo(() => getAncestorIds(id), [id]);

	const parent_id = useMemo(
		() => ancestor_ids.slice(-1)[0] || "",
		[ancestor_ids]
	);

	const drop_areas = useDropAreas({ id, parent_id, ancestor_ids });

	return (
		<context.Provider
			value={{
				ancestor_ids,
				drop_areas,
				id,
				parent_id,
			}}
		>
			{children}
		</context.Provider>
	);
};
