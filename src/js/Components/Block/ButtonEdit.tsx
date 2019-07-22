import { Div, Button, Icon, Span } from "utils/components";

type withDispatchProps = {
	openGeneralSidebar: Function;
	selectBlock: Function;
};

type ParentProps = {
	id: string;
	parent_id: string;
	template_lock: string | undefined;
	block: import("wordpress__blocks").BlockInstance;
	can_move: boolean;
	index: number;
	close: Function;
};

const { __ } = wp.i18n;
const { withDispatch } = wp.data;

export const ButtonEdit = withDispatch<withDispatchProps, ParentProps>(
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
