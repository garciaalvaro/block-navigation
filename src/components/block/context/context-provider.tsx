import React from "react";
import { useMemo } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

import type { Component } from "./types";
import { context } from "./context";
import type { BlockId } from "@/types";
import { useDropAreas } from "./utils";

export const ContextProvider: Component = props => {
	const { id } = props;

	const ancestors_id: BlockId[] = useSelect(select =>
		select(
			"core/block-editor"
			// @ts-expect-error @wordpress/block-editor types are outdated
		).getBlockParents(id)
	);

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
			{props.children}
		</context.Provider>
	);
};
