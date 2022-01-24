import React from "react";
import { useSelect } from "@wordpress/data";
import { useMemo } from "@wordpress/element";

import { BlockId } from "@/types";

import type { Component } from "./types";
import { context } from "./context";
import { useDropAreas } from "./utils";

export const ContextProvider: Component = props => {
	const { children, id } = props;

	const parent_id = useSelect(
		select => select("core/block-editor").getBlockRootClientId(id) || "",
		[id]
	);

	const ancestor_ids = useSelect<BlockId[]>(
		// @ts-expect-error @wordpress/block-editor types are outdated
		select => select("core/block-editor").getBlockParents(id) || [],
		[id]
	);

	const drop_areas = useDropAreas({ id, parent_id, ancestor_ids });

	const value = useMemo(
		() => ({
			ancestor_ids,
			drop_areas,
			id,
			parent_id,
		}),
		[ancestor_ids, drop_areas, id, parent_id]
	);

	return <context.Provider value={value}>{children}</context.Provider>;
};
