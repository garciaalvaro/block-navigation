import { Div, Icon, Button, Span } from "utils/components";

type withSelectProps = {
	sibling_ids: string[];
};

type withDispatchProps = {
	moveBlockToPosition: Function;
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

type Props = withSelectProps & withDispatchProps & ParentProps;

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;

export const ButtonsMove = compose([
	withSelect<withSelectProps, ParentProps>((select, { parent_id }) => ({
		sibling_ids: select("core/block-editor").getBlockOrder(parent_id)
	})),
	withDispatch(dispatch => ({
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition
	}))
])((props => {
	const {
		can_move,
		id,
		parent_id,
		index,
		moveBlockToPosition,
		close,
		sibling_ids
	} = props;
	const moveTo = (index: number) =>
		moveBlockToPosition(id, parent_id, parent_id, index);

	return (
		<Fragment>
			<Button
				classes={["button-text", "button-menu"]}
				disabled={!can_move || index === 0}
				onClick={() => {
					close();
					moveTo(index - 1);
				}}
			>
				<Div classes="menu-icon">
					<Icon icon="collapse" />
				</Div>
				<Span>{__("Move Block Up")}</Span>
			</Button>
			<Button
				classes={["button-text", "button-menu"]}
				disabled={!can_move || index + 1 === sibling_ids.length}
				onClick={() => {
					close();
					moveTo(index + 1);
				}}
			>
				<Div classes="menu-icon">
					<Icon icon="expand" />
				</Div>
				<Span>{__("Move Block Down")}</Span>
			</Button>
		</Fragment>
	);
}) as React.ComponentType<Props>);
