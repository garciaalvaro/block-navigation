import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import copy from "copy-text-to-clipboard";

import { Button, Div, Icon, Span } from "@/utils/components";

export const ButtonCopyId: FunctionComponent<MenuProps> = props => {
	const { id, closeMenu } = props;

	const onClick = () => {
		closeMenu();
		copy(id);
	};

	return (
		<Button
			className={["button", "button-menu", "button-copy_clientId"]}
			onClick={onClick}
		>
			<Div className="menu-icon">
				<Icon icon="copy" />
			</Div>

			<Span>{__("Copy Block clientId")}</Span>
		</Button>
	);
};
