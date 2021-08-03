import React from "react";
import type { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { Fragment, useContext } from "@wordpress/element";

import { context } from "@/components/block";
import { Button } from "../button";

export const ButtonsMove: FunctionComponent = () => {
	const { id, parent_id } = useContext(context);

	const index = useSelect(
		select => select("core/block-editor").getBlockIndex(id, parent_id),
		[id, parent_id]
	);

	const can_move = useSelect(
		select =>
			select("core/block-editor").getTemplateLock(parent_id) !== "all",
		[parent_id]
	);

	const sibling_ids = useSelect(
		select => select("core/block-editor").getBlockOrder(parent_id),
		[parent_id]
	);

	const { moveBlockToPosition } = useDispatch("core/block-editor");

	const move_up_is_disabled = !can_move || index === 0;

	const move_down_is_disabled = !can_move || index + 1 === sibling_ids.length;

	const onClickUp = () => {
		if (move_up_is_disabled) {
			return;
		}

		moveBlockToPosition(id, parent_id, parent_id, index - 1);
	};

	const onClickDown = () => {
		if (move_down_is_disabled) {
			return;
		}

		moveBlockToPosition(id, parent_id, parent_id, index + 1);
	};

	return (
		<Fragment>
			<Button
				onClick={onClickUp}
				icon="collapse"
				is_disabled={move_up_is_disabled}
			>
				{__("Move Block Up")}
			</Button>

			<Button
				onClick={onClickDown}
				icon="expand"
				is_disabled={move_down_is_disabled}
			>
				{__("Move Block Down")}
			</Button>
		</Fragment>
	);
};
