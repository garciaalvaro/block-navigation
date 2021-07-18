import React from "react";
import type { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { useContext } from "@wordpress/element";

import { context } from "@/components/block";
import { Button } from "../button";
import { store_slug } from "@/store";

export const ButtonMoveTo: FunctionComponent = () => {
	const { id } = useContext(context);

	const { setMovingType, setMovingBlock } = useDispatch(store_slug);

	const parent_id =
		useSelect(select =>
			select("core/block-editor").getBlockRootClientId(id)
		) || "";

	const can_move =
		useSelect(select =>
			select("core/block-editor").getTemplateLock(parent_id)
		) !== "all";

	return (
		<Button
			is_disabled={!can_move}
			onClick={() => {
				setMovingType("by_click");
				setMovingBlock();
			}}
			icon="move"
		>
			{__("Move Block To")}
		</Button>
	);
};
