import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { Fragment } from "@wordpress/element";

import { MenuButton } from "../MenuButton";

interface Props {
	id: BlockId;
	closeMenu: () => void;
}

export const ButtonsMove: FunctionComponent<Props> = props => {
	const { id, closeMenu } = props;

	const parent_id =
		useSelect(select =>
			select("core/block-editor").getBlockRootClientId(id)
		) || "";

	const index = useSelect(select =>
		select("core/block-editor").getBlockIndex(id, parent_id)
	);

	const can_move =
		useSelect(select =>
			select("core/block-editor").getTemplateLock(parent_id)
		) !== "all";

	const sibling_ids = useSelect(select =>
		select("core/block-editor").getBlockOrder(parent_id)
	);

	const { moveBlockToPosition } = useDispatch("core/block-editor");

	const move_up_is_disabled = !can_move || index === 0;

	const move_down_is_disabled = !can_move || index + 1 === sibling_ids.length;

	const onClickUp = () => {
		if (move_up_is_disabled) {
			return;
		}

		closeMenu();
		moveBlockToPosition(id, parent_id, parent_id, index - 1);
	};

	const onClickDown = () => {
		if (move_down_is_disabled) {
			return;
		}

		closeMenu();
		moveBlockToPosition(id, parent_id, parent_id, index + 1);
	};

	return (
		<Fragment>
			<MenuButton
				onClick={onClickUp}
				icon="collapse"
				is_disabled={move_up_is_disabled}
				label={__("Move Block Up")}
			/>

			<MenuButton
				onClick={onClickDown}
				icon="expand"
				is_disabled={move_down_is_disabled}
				label={__("Move Block Down")}
			/>
		</Fragment>
	);
};
