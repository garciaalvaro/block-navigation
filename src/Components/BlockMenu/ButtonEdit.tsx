import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";

import { Div, Button, Icon, Span } from "utils/components";

export const ButtonEdit: React.ComponentType<MenuProps> = props => {
	const { id, closeMenu } = props;
	const { openGeneralSidebar } = useDispatch("core/edit-post");
	const { selectBlock } = useDispatch("core/block-editor");

	const onClick = () => {
		closeMenu();
		selectBlock(id);
		openGeneralSidebar("edit-post/block");
	};

	return (
		<Button className={["button", "button-menu"]} onClick={onClick}>
			<Div className="menu-icon">
				<Icon icon="edit" />
			</Div>

			<Span>{__("Open Block Settings")}</Span>
		</Button>
	);
};
