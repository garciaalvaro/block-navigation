import { Div, Icon, Button, Span } from "utils/components";
import { pr_store } from "utils/data/plugin";
import { MenuProps } from "./Menu";

type withDispatchProps = {
	setMovingBlock: ActionCreators["setMovingBlock"];
	setMovingType: ActionCreators["setMovingType"];
};

const { __ } = wp.i18n;
const { withDispatch } = wp.data;

export const ButtonMoveTo = withDispatch<withDispatchProps, MenuProps>(
	dispatch => ({
		setMovingBlock: dispatch(pr_store).setMovingBlock,
		setMovingType: dispatch(pr_store).setMovingType
	})
)(props => {
	const {
		id,
		parent_id,
		template_lock,
		block,
		can_move,
		setMovingBlock,
		setMovingType,
		close,
		close_children,
		index
	} = props;

	return (
		<Button
			classes={["button", "button-menu", !can_move ? "is_disabled" : null]}
			onClick={() => {
				close();
				close_children();
				setMovingType("by_click");
				setMovingBlock({
					id,
					parent_id,
					template_lock,
					block_name: block.name,
					index
				});
			}}
		>
			<Div classes="menu-icon">
				<Icon icon="move" />
			</Div>
			<Span>{__("Move Block To")}</Span>
		</Button>
	);
});
