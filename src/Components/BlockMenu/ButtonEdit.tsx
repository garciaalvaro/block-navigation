import { __ } from "@wordpress/i18n";
import { withDispatch } from "@wordpress/data";

import { Div, Button, Icon, Span } from "utils/Components";

interface WithDispatchProps {
	openGeneralSidebar: typeof import("wordpress__edit-post/store/actions").openGeneralSidebar;
	selectBlock: typeof import("wordpress__block-editor/store/actions").selectBlock;
}

interface OwnProps extends MenuProps {}

interface Props extends OwnProps, WithDispatchProps {}

export const ButtonEdit: React.ComponentType<OwnProps> = withDispatch<
	WithDispatchProps,
	OwnProps
>(dispatch => ({
	openGeneralSidebar: dispatch("core/edit-post").openGeneralSidebar,
	selectBlock: dispatch("core/block-editor").selectBlock
}))((props: Props) => {
	const { id, close, selectBlock, openGeneralSidebar } = props;
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
});
