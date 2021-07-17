import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";

import { Button as MenuButton } from "../button";

interface Props {
	id: BlockId;
	closeMenu: () => void;
}

export const ButtonEdit: FunctionComponent<Props> = props => {
	const { id, closeMenu } = props;
	const { openGeneralSidebar } = useDispatch("core/edit-post");
	const { selectBlock } = useDispatch("core/block-editor");

	const onClick = () => {
		closeMenu();
		selectBlock(id);
		openGeneralSidebar("edit-post/block");
	};

	return (
		<MenuButton
			onClick={onClick}
			icon="edit"
			label={__("Open Block Settings")}
		/>
	);
};
