import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import copy from "copy-text-to-clipboard";

import styles from "./ButtonCopyId.styl";
import { MenuButton } from "../MenuButton";

interface Props {
	id: BlockId;
	closeMenu: () => void;
}

export const ButtonCopyId: FunctionComponent<Props> = props => {
	const { id, closeMenu } = props;

	const onClick = () => {
		closeMenu();
		copy(id);
	};

	return (
		<MenuButton
			className={styles.button}
			onClick={onClick}
			icon="copy"
			label={__("Copy Block clientId")}
		/>
	);
};
