import { Div, Icon, Button, Span } from "utils/components";

interface WithSelectProps {
	sibling_ids: string[];
}

interface WithDispatchProps {
	moveBlockToPosition: Function;
}

type Props = WithSelectProps & WithDispatchProps & MenuProps;

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;

export const ButtonsMove: React.ComponentType = compose([
	withSelect<WithSelectProps, MenuProps>((select, { parent_id }) => ({
		sibling_ids: select("core/block-editor").getBlockOrder(parent_id)
	})),
	withDispatch<WithDispatchProps>(dispatch => ({
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition
	}))
])((props: Props) => {
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
	const up_is_disabled = !can_move || index === 0;
	const down_is_disabled = !can_move || index + 1 === sibling_ids.length;

	return (
		<Fragment>
			<Button
				classes={[
					"button",
					"button-menu",
					up_is_disabled ? "is_disabled" : null
				]}
				onClick={() => {
					if (up_is_disabled) {
						return;
					}

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
				classes={[
					"button",
					"button-menu",
					down_is_disabled ? "is_disabled" : null
				]}
				onClick={() => {
					if (down_is_disabled) {
						return;
					}

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
});
