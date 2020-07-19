import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";

import { Div, Icon, Button, Span } from "utils/components";

export const ButtonMoveTo: FunctionComponent<MenuProps> = props => {
	const { id, closeMenu, setMovingBlock } = props;

	const { setMovingType } = useDispatch("melonpan/block-navigation");

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
			className={[
				"button",
				"button-menu",
				!can_move ? "is_disabled" : null,
			]}
			onClick={() => {
				closeMenu();
				setMovingType("by_click");
				setMovingBlock();
			}}
		>
			<Div className="menu-icon">
				<Icon icon="move" />
			</Div>

			<Span>{__("Move Block To")}</Span>
		</Button>
	);
};
