import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";

import { Button as MenuButton } from "../button";
import { store_slug } from "@/utils/data";

interface Props {
	id: BlockId;
	closeMenu: () => void;
	setMovingBlock: () => void;
}

export const ButtonMoveTo: FunctionComponent<Props> = props => {
	const { id, closeMenu, setMovingBlock } = props;

	const { setMovingType } = useDispatch(store_slug);

	const parent_id =
		useSelect(select =>
			select("core/block-editor").getBlockRootClientId(id)
		) || "";

	const can_move =
		useSelect(select =>
			select("core/block-editor").getTemplateLock(parent_id)
		) !== "all";

	return (
		<MenuButton
			is_disabled={!can_move}
			onClick={() => {
				closeMenu();
				setMovingType("by_click");
				setMovingBlock();
			}}
			icon="move"
			label={__("Move Block To")}
		/>
	);
};
