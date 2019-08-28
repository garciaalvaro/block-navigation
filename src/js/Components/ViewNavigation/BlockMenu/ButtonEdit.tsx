import { Div, Button, Icon, Span } from "utils/components";

interface WithDispatchProps {
	openGeneralSidebar: typeof import("wordpress__edit-post/store/actions").openGeneralSidebar;
	selectBlock: typeof import("wordpress__block-editor/store/actions").selectBlock;
}

interface OwnProps extends MenuProps {}

interface Props extends OwnProps, WithDispatchProps {}

const { __ } = wp.i18n;
const { withDispatch } = wp.data;

export const ButtonEdit: React.ComponentType<OwnProps> = withDispatch<
	WithDispatchProps,
	OwnProps
>(dispatch => ({
	openGeneralSidebar: dispatch("core/edit-post").openGeneralSidebar,
	selectBlock: dispatch("core/block-editor").selectBlock
}))((props: Props) => {
	const { id, close, selectBlock, openGeneralSidebar } = props;

	return (
		<Button
			classes={["button", "button-menu"]}
			onClick={() => {
				close();
				selectBlock(id);
				openGeneralSidebar("edit-post/block");
			}}
		>
			<Div classes="menu-icon">
				<Icon icon="edit" />
			</Div>
			<Span>{__("Open Block Settings")}</Span>
		</Button>
	);
});
