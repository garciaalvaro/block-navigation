import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";

import { Button as MenuButton } from "../Button";

interface Props {
	id: BlockId;
	closeMenu: () => void;
}

export const ButtonRemove: FunctionComponent<Props> = props => {
	const { id, closeMenu } = props;

	const { removeBlock } = useDispatch("core/block-editor");

	const onClick = () => {
		closeMenu();
		removeBlock(id);
	};

	return (
		<MenuButton
			onClick={onClick}
			icon="remove"
			label={__("Remove Block")}
		/>
	);
};
