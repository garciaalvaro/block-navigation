import { Div, Button, Icon, Span } from "utils/components";

interface WithDispatchProps {
	openGeneralSidebar: Function;
	selectBlock: Function;
}

const { __ } = wp.i18n;
const { withDispatch } = wp.data;

export const ButtonEdit = withDispatch<WithDispatchProps, MenuProps>(
	dispatch => ({
		openGeneralSidebar: dispatch("core/edit-post").openGeneralSidebar,
		selectBlock: dispatch("core/editor").selectBlock
	})
)(props => {
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
