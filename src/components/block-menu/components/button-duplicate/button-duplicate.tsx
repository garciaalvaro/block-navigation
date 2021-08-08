import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";

import { context } from "@/components/block";

import { Button } from "../button";

export const ButtonDuplicate: FunctionComponent = () => {
	const { id, parent_id } = useContext(context);

	// @ts-expect-error @wordpress/blocks types are outdated
	const { duplicateBlocks } = useDispatch("core/block-editor");

	const can_duplicate = useSelect(
		select => {
			const { getBlockName, canInsertBlockType } =
				select("core/block-editor");

			const block_name = getBlockName(id) || "";

			const can_have_sibling = canInsertBlockType(block_name, parent_id);

			const can_have_multiple_of_type = select(
				"core/blocks"
			).hasBlockSupport(block_name, "multiple", true);

			return can_have_sibling && can_have_multiple_of_type;
		},
		[id, parent_id]
	);

	const onClick = () => {
		if (!duplicateBlocks || !can_duplicate) return;

		duplicateBlocks([id]);
	};

	return (
		<Button onClick={onClick} icon="duplicate" is_disabled={!can_duplicate}>
			{__("Duplicate Block")}
		</Button>
	);
};
