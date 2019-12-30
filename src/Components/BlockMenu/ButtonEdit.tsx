import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";

import { Div, Button, Icon, Span } from "utils/Components";

interface OwnProps extends MenuProps {}

export const ButtonEdit: React.ComponentType<MenuProps> = props => {
	const { id, close } = props;

	const { openGeneralSidebar } = useDispatch("core/edit-post");
	const { selectBlock } = useDispatch("core/block-editor");

	const onClick = () => {
		close();
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
