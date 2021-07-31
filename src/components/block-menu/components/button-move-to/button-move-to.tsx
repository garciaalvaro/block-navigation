import React from "react";
import type { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { useContext } from "@wordpress/element";

import { context } from "@/components/block";
import { store_slug } from "@/store";

import { Button } from "../button";

export const ButtonMoveTo: FunctionComponent = () => {
	const { id } = useContext(context);

	const { movingBlockUpdate, movingTypeUpdate } = useDispatch(store_slug);

	const parent_id = useSelect(
		select => select("core/block-editor").getBlockRootClientId(id) || ""
	);

	const name = useSelect(
		select => select("core/block-editor").getBlockName(id) || ""
	);

	const can_move = useSelect(
		select =>
			select("core/block-editor").getTemplateLock(parent_id) !== "all"
	);

	return (
		<Button
			is_disabled={!can_move}
			onClick={() => {
				movingTypeUpdate("by_click");

				movingBlockUpdate({
					id,
					name,
					parent_id,
				});
			}}
			icon="move"
		>
			{__("Move Block To")}
		</Button>
	);
};
